"use client";

import { CalendarDay } from "@/components/calendar/calendar-day";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { UserWorkDayDetailForm } from "@/components/user/user-work-day-detail-form";
import {
  CalendarDay as CalendarDayType,
  CalendarEntries,
  CalendarSizeVariant,
  User
} from "@/types";
import { useState } from "react";

function UserEditWorkDayDetailDialog({
  user,
  calendarDay,
  calendarSizeVariant = "default",
  holidayInfos = [],
  closeDialogOnFormSubmitSuccess = false,
  ...other
}: {
  user: User;
  calendarDay: CalendarEntries;
  calendarSizeVariant?: CalendarSizeVariant;
  holidayInfos?: CalendarDayType[];
  closeDialogOnFormSubmitSuccess?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => setIsOpen(open)}
      snapPoints={["380px", 1]}
      activeSnapPoint="380px"
      {...other}
    >
      <DialogTrigger asChild>
        <CalendarDay
          className="cursor-pointer"
          calendarDay={calendarDay}
          calendarSizeVariant={calendarSizeVariant}
          holidayInfos={holidayInfos}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{calendarDay.formattedDate}</DialogTitle>
        <DialogDescription>Edit work day details</DialogDescription>
        <UserWorkDayDetailForm
          user={user}
          calendarDay={calendarDay}
          userWorkDayDetail={calendarDay.workDayDetails}
          onFormSubmitSuccess={() => {
            if (closeDialogOnFormSubmitSuccess) {
              setIsOpen(false);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export { UserEditWorkDayDetailDialog };
