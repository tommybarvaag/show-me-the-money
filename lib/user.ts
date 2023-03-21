import "server-only";

import { User, UserWorkDayDetail } from "@/types";
import { getCalendarMonth, getCalendarYear } from "@/utils/calendar-utils";
import { getUserEarningsDetails } from "@/utils/user-utils";
import { getToken, JWT } from "next-auth/jwt";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { cache } from "react";
import { planetscaleEdge } from "./planetscale-edge";
import { query } from "./query";

// Temporary workaround for enabling NextAuth to work with Edge Functions
// Clean up when @auth/next is ready
const getEdgeFriendlyToken = cache(async (): Promise<JWT | null> => {
  // @ts-ignore
  const req: NextRequest = {
    headers: headers(),
    cookies: cookies() as RequestCookies
  };

  const token = await getToken({ req });

  return token;
});

const getUser = cache(async (activeDirectoryId?: string): Promise<User> => {
  const userActiveDirectoryId =
    activeDirectoryId ?? (await getEdgeFriendlyToken())?.activeDirectoryId;

  if (!userActiveDirectoryId) {
    return redirect("/login");
  }

  const { rows } = await planetscaleEdge.execute("SELECT * FROM user WHERE activeDirectoryId = ?", [
    userActiveDirectoryId
  ]);

  if (!rows?.length) {
    return redirect("/login");
  }

  const user = rows[0] as User;

  if (!user) {
    return redirect("/login");
  }

  return {
    ...user,
    // convert string decimal to number
    tax: Number(rows[0]?.["tax"]),
    workHours: Number(rows[0]?.["workHours"]),
    commission: Number(rows[0]?.["commission"]),
    hourlyRate: Number(rows[0]?.["hourlyRate"]),
    workDayDetails: user?.workDayDetails ?? [],
    feedback: user?.feedback ?? []
  };
});

const getUserWorkDayDetails = cache(async (activeDirectoryId?: string) => {
  const userActiveDirectoryId =
    activeDirectoryId ?? (await getEdgeFriendlyToken())?.activeDirectoryId;

  if (!userActiveDirectoryId) {
    return redirect("/login");
  }

  const { rows } = await planetscaleEdge.execute(
    "SELECT uwdd.id, uwdd.date, uwdd.nonCommissionedHours, uwdd.extraHours, uwdd.sickDay, uwdd.userId FROM user LEFT JOIN user_work_day_detail AS uwdd ON user.id = uwdd.userId WHERE user.activeDirectoryId = ?",
    [userActiveDirectoryId]
  );

  const userWorkDayDetail = rows as UserWorkDayDetail[];

  return (userWorkDayDetail ?? []).map(userWorkDayDetail => ({
    ...userWorkDayDetail,
    nonCommissionedHours: Number(userWorkDayDetail.nonCommissionedHours),
    extraHours: Number(userWorkDayDetail.extraHours)
  }));
});

const getUserWithWorkDayDetails = cache(async (activeDirectoryId?: string) => {
  const [userResult, userWorkDayDetailResult] = await query([
    getUser(activeDirectoryId),
    getUserWorkDayDetails(activeDirectoryId)
  ]);

  return {
    ...userResult.data,
    workDayDetails: userWorkDayDetailResult.data
  };
});

const getUserEarnings = cache(async (activeDirectoryId?: string, activeDate?: Date) => {
  const userActiveDirectoryId =
    activeDirectoryId ?? (await getEdgeFriendlyToken())?.activeDirectoryId;

  if (!userActiveDirectoryId) {
    return redirect("/login");
  }

  const user = await getUserWithWorkDayDetails(userActiveDirectoryId);

  if (!user) {
    return undefined;
  }

  const now = new Date();

  const year = getCalendarYear(now.getFullYear());

  const currentYear = new Date().getFullYear();

  const lastYear = getCalendarYear(currentYear - 1);
  const nextYear = getCalendarYear(currentYear + 1);

  const currentMonth = activeDate ? activeDate.getMonth() : now.getMonth();

  const month = getCalendarMonth(now);

  const activeMonth = activeDate ? getCalendarMonth(activeDate) : month;

  const lastMonth = getCalendarMonth(new Date(currentYear, currentMonth - 1));

  const nextMonth = getCalendarMonth(new Date(currentYear, currentMonth + 1));

  return getUserEarningsDetails(
    {
      commission: user.commission ?? 0,
      hourlyRate: user.hourlyRate ?? 0,
      tax: user.tax ?? 0,
      workHours: user.workHours ?? 0
    },
    year,
    nextYear,
    activeMonth,
    month,
    lastMonth,
    nextMonth,
    (user.workDayDetails ?? []).map(x => ({
      extraHours: x.extraHours ?? 0,
      nonCommissionedHours: x.nonCommissionedHours ?? 0,
      date: x.date ?? new Date().toISOString(),
      id: x.id ?? 0,
      sickDay: x.sickDay ?? false,
      userId: x.userId ?? 0
    }))
  );
});

const getUserAvatar = cache(async (activeDirectoryId?: string) => {
  const userActiveDirectoryId =
    activeDirectoryId ?? (await getEdgeFriendlyToken())?.activeDirectoryId;

  if (!userActiveDirectoryId) {
    return redirect("/login");
  }

  const user = await getUser(userActiveDirectoryId);

  if (!user?.refreshToken) {
    return undefined;
  }

  const url = `https://login.microsoftonline.com/${process.env.NEXTAUTH_AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.NEXTAUTH_AZURE_AD_CLIENT_ID,
      client_secret: process.env.NEXTAUTH_AZURE_AD_SECRET,
      grant_type: "refresh_token",
      refresh_token: user.refreshToken,
      scope: "offline_access openid User.Read"
    })
  });

  const refreshedTokens = await response.json();

  if (!response.ok) {
    return undefined;
  }
  const [avatarResponse] = await query([
    fetch(`https://graph.microsoft.com/v1.0/me/photos/120x120/$value`, {
      headers: {
        Authorization: `Bearer ${refreshedTokens.access_token}`
      }
    }),
    planetscaleEdge.execute(
      "UPDATE user SET refreshToken = ?, accessTokenExpires = ?, updated = ? WHERE activeDirectoryId = ?",
      [
        refreshedTokens.refresh_token,
        Date.now() + refreshedTokens?.ext_expires_in * 1000,
        new Date(),
        userActiveDirectoryId
      ]
    )
  ]);

  if (!avatarResponse?.data?.ok) {
    return undefined;
  }

  const pictureBuffer = await avatarResponse?.data.arrayBuffer();

  return {
    src: `data:image/jpeg;base64,${btoa(
      String.fromCharCode.apply(null, new Uint8Array(pictureBuffer))
    )}`,
    name: user.name
  };
});

export { getUser, getUserEarnings, getUserAvatar };