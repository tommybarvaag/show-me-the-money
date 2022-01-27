import DEFAULT_USER_SALARY from "@/constants/defaultUserSalary";
import { getEarningsForMonth, getEarningsForYear } from "@/logic/earningsLogic";
import {
  CalendarMonth,
  CalendarYear,
  User,
  UserEarningsDetails,
  UserSalaryDetails,
  UserWorkDayDetail
} from "@/types";

export const getUserSalaryDetails = (user: User): UserSalaryDetails => ({
  hourlyRate: user?.hourlyRate ?? DEFAULT_USER_SALARY.hourlyRate,
  commission: user?.commission ?? DEFAULT_USER_SALARY.commission,
  tax: user?.tax ?? DEFAULT_USER_SALARY.tax,
  workHours: user?.workHours ?? DEFAULT_USER_SALARY.workHours
});

export const getUserEarningsDetails = (
  userSalaryDetails: UserSalaryDetails,
  year: CalendarYear,
  nextYear: CalendarYear,
  activeCalendarMonthDetail: CalendarMonth,
  currentMonthDetail: CalendarMonth,
  lastMonthDetail: CalendarMonth,
  nextMonthDetail: CalendarMonth,
  workDayDetails: UserWorkDayDetail[] = []
): UserEarningsDetails => {
  const { hourlyRate, commission, tax, workHours } = userSalaryDetails;

  const activeCalendarMonthStatistics = getEarningsForMonth(
    activeCalendarMonthDetail,
    hourlyRate,
    commission,
    tax,
    workHours,
    workDayDetails
  );

  const currentMonthStatistics = getEarningsForMonth(
    currentMonthDetail,
    hourlyRate,
    commission,
    tax,
    workHours,
    workDayDetails
  );

  const lastMonthStatistics = getEarningsForMonth(
    lastMonthDetail,
    hourlyRate,
    commission,
    tax,
    workHours,
    workDayDetails
  );
  const nextMonthStatistics = getEarningsForMonth(
    nextMonthDetail,
    hourlyRate,
    commission,
    tax,
    workHours,
    workDayDetails
  );

  return {
    workDayDetails,
    activeCalendarMonthStatistics,
    currentMonthStatistics,
    lastMonthStatistics,
    nextMonthStatistics,
    nextPayDayStatistics: new Date().getDate() > 20 ? currentMonthStatistics : lastMonthStatistics,
    // TODO: To be able to calculate yearly salary and include non commissioned hours
    // we need to change the logic to store non commissioned hours per month
    yearSalaryStatistics: getEarningsForYear(
      year,
      hourlyRate,
      commission,
      tax,
      workHours,
      workDayDetails
    ),
    // TODO: To be able to calculate yearly salary and include non commissioned hours
    // we need to change the logic to store non commissioned hours per month
    nextYearSalaryStatistics: getEarningsForYear(
      nextYear,
      hourlyRate,
      commission,
      tax,
      workHours,
      workDayDetails
    )
  };
};
