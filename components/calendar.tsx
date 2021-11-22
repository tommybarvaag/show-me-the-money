import CalendarDay from "@/components/calendarDay";
import { useUser } from "@/components/user";
import { CalendarDay as CalendarDayType, WithChildren } from "@/types";
import { useCalendar } from "@/utils/calendarProvider";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useToggle } from "react-use";
import { Box, Button, Card, Flex, Grid, IconButton, Overlay, Svg, Text } from "./ui";

type CalendarDayColorDescriptionProps = WithChildren<{
  color: string;
}>;

const CalendarDayColorDescription = ({ children, color }: CalendarDayColorDescriptionProps) => {
  return (
    <Flex
      alignItems="center"
      css={{
        mx: "$2",
        "@bp1": {
          mx: "$4"
        }
      }}
    >
      <Box
        css={{
          height: "$3",
          width: "$3",
          borderRadius: "$round",
          backgroundColor: color
        }}
      ></Box>
      <Text
        size="1"
        css={{
          marginLeft: "$2"
        }}
      >
        {children}
      </Text>
    </Flex>
  );
};

const CalendarDayHeading = ({ children }: WithChildren<{}>) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      css={{
        py: "$2"
      }}
    >
      <Text size="1" color="textDark">
        {children}
      </Text>
    </Flex>
  );
};

const Calendar = ({ ...other }) => {
  const { user } = useUser();
  const { yearName, monthDetail, years, setYear, incrementMonth, decrementMonth } = useCalendar();

  const [toggledDay, setToggledDay] = React.useState<CalendarDayType>();

  const [showYearPicker, toggleYearPicker] = useToggle(false);

  const renderSpacingDays = (days: CalendarDayType[]): JSX.Element[] | null => {
    if (days === null || days === undefined || days?.length <= 0) {
      return null;
    }

    const spacingDaysToRender: Record<string, number> = {
      MONDAY: 0,
      TUESDAY: 1,
      WEDNESDAY: 2,
      THURSDAY: 3,
      FRIDAY: 4,
      SATURDAY: 5,
      SUNDAY: 6
    };

    return [...Array(spacingDaysToRender[days[0].name?.toUpperCase()] ?? 0)].map((key, index) => (
      <div key={`calendar-day-spacing-${index}`} />
    ));
  };

  return (
    <Box
      css={{
        position: "relative",
        width: "100%",
        userSelect: "none"
      }}
      {...other}
    >
      <Flex
        justifyContent="between"
        alignItems="center"
        css={{
          marginBottom: "$3"
        }}
      >
        <IconButton
          onClick={() => {
            toggleYearPicker(false);
            decrementMonth();
          }}
        >
          <Svg as={HiChevronLeft} color="white" />
        </IconButton>
        <Button size="2" variant="black" ghost onClick={toggleYearPicker}>
          {`${monthDetail?.month} ${yearName}`}
        </Button>
        <IconButton
          onClick={() => {
            toggleYearPicker(false);
            incrementMonth();
          }}
        >
          <Svg as={HiChevronRight} color="white" />
        </IconButton>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <CalendarDayColorDescription color="$white">Off work</CalendarDayColorDescription>
        <CalendarDayColorDescription color="$green">Work</CalendarDayColorDescription>
        <CalendarDayColorDescription color="$red">Non commissioned</CalendarDayColorDescription>
      </Flex>
      <Grid
        as={Card}
        gridTemplateColumns="7"
        gap="1"
        css={{
          display: "grid",
          padding: "$1",
          minHeight: "300px",
          my: "$3",
          mx: "auto",
          "@bp1": {
            padding: "$2"
          }
        }}
      >
        {toggledDay ? (
          <Overlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            css={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "$overlay",
              transition: "opacity 0.2s ease-in-out",
              zIndex: "10",
              borderRadius: "$4"
            }}
          ></Overlay>
        ) : null}
        <CalendarDayHeading>mon.</CalendarDayHeading>
        <CalendarDayHeading>tue.</CalendarDayHeading>
        <CalendarDayHeading>wed.</CalendarDayHeading>
        <CalendarDayHeading>thu.</CalendarDayHeading>
        <CalendarDayHeading>fri.</CalendarDayHeading>
        <CalendarDayHeading>sat.</CalendarDayHeading>
        <CalendarDayHeading>sun.</CalendarDayHeading>
        {renderSpacingDays(monthDetail?.days)}
        {monthDetail?.days?.map((day, i) => (
          <CalendarDay
            key={`calendar-day-${i}`}
            day={day}
            isWorkDay={day.isWorkDay}
            onExpand={() => setToggledDay(day)}
            onCollapse={() => setToggledDay(undefined)}
          />
        ))}
        <Box
          as={motion.div}
          initial={showYearPicker ? "open" : "collapsed"}
          animate={showYearPicker ? "open" : "collapsed"}
          variants={{
            open: {
              opacity: 1,
              height: "auto"
            },
            collapsed: {
              opacity: 0,
              height: 0
            }
          }}
          transition={{
            ease: "easeOut"
          }}
          css={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "$main"
          }}
        >
          <Grid
            gridTemplateColumns="3"
            alignItems="center"
            css={{
              height: "100%",
              padding: "$2"
            }}
          >
            <AnimatePresence exitBeforeEnter>
              {showYearPicker &&
                years.map(year => (
                  <Box
                    as={motion.div}
                    key={year}
                    onClick={() => {
                      setYear(year);
                      toggleYearPicker();
                    }}
                    exit={{ opacity: 0 }}
                    css={{
                      cursor: "pointer",
                      padding: "$1",
                      fontSize: "$4",
                      textAlign: "center"
                    }}
                  >
                    {year}
                  </Box>
                ))}
            </AnimatePresence>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default Calendar;
