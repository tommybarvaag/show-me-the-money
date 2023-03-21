import { getUserEarnings } from "@/lib/user";

export default async function NextPaycheck() {
  const userEarnings = await getUserEarnings();

  return (
    <div>
      <div className="text-xs text-neutral-400">Next paycheck</div>
      <div className="text-sm">{userEarnings?.nextPayDayStatistics.payDay}</div>
      <div className="text-sm font-bold text-emerald-500">
        {userEarnings?.nextPayDayStatistics.netFormatted}
      </div>
    </div>
  );
}