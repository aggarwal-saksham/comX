import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import CalendarAPI from "@/api/calendar/CalendarAPI";
import ErrorPage from "../genral/ErrorPage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MainCalendar() {
  const { tasks, tasksLoading, tasksError } = CalendarAPI();

  const activeChannel = useSelector((state: RootState) => state.activeChannel);
  const year = useSelector((state: RootState) => state.year);

  const [currentDate, setCurrentDate] = useState(DateTime.now());

  useEffect(() => {
    const handleSetMonth = (month: number) => {
      if (currentDate.month !== month) {
        setCurrentDate((prevDate) => prevDate.set({ month }));
      }
    };

    const handleSetYear = (newYear: number) => {
      if (currentDate.year !== newYear) {
        setCurrentDate((prevDate) => prevDate.set({ year: newYear }));
      }
    };

    if (activeChannel > 0 && activeChannel <= 12) {
      handleSetMonth(activeChannel);
    }

    const parsedYear = parseInt(year, 10);
    if (!isNaN(parsedYear)) {
      handleSetYear(parsedYear);
    }
  }, [year, activeChannel, currentDate]);

  // useEffect(()=>{
  // if(!tasksLoading) setEvents(tasks);
  // },[tasksLoading,tasks])

  if (tasksLoading)
    return <LoadingSpinner message="Loading calendar schedule..." />;
  if (tasksError) return <ErrorPage />;

  const events: CalendarEvent[] = Array.isArray(tasks) ? tasks : [];

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = DateTime.local(year, month, 1);
    const lastDay = firstDay.endOf("month");
    const days = [];

    for (let i = 1; i <= lastDay.day; i++) {
      days.push(DateTime.local(year, month, i));
    }
    return days;
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentDate.year, currentDate.month);
    const firstDayOfMonth = days[0].weekday;
    const paddingDays = firstDayOfMonth === 7 ? 0 : firstDayOfMonth;

    return (
      <div className="grid grid-cols-7 gap-1 w-full">
        {weekdays.map((day) => (
          <div key={day} className="text-center font-bold py-2">
            {day}
          </div>
        ))}
        {Array(paddingDays)
          .fill(null)
          .map((_, index) => (
            <div key={`padding-${index}`} className="p-2"></div>
          ))}
        {days.map((day) => {
          const dayEvents = events.filter((event) => {
            const start = DateTime.fromISO(event.startTime);
            const end = DateTime.fromISO(event.endTime);
            return day >= start && day <= end;
          });
          return (
            <motion.div
              key={day.toISO()}
              className="p-2 border border-gray-200 rounded-lg min-h-[90px] bg-white shadow-xs"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className={`text-center text-sm ${
                  day.hasSame(DateTime.now(), "day")
                    ? "font-bold text-blue-600 bg-blue-50 rounded-full w-7 h-7 flex items-center justify-center mx-auto"
                    : "text-gray-700"
                }`}
              >
                {day.day}
              </div>
              {dayEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className={`${event.color} text-white text-xs p-1 mt-1 rounded-md cursor-pointer truncate`}
                  whileHover={{ scale: 1.05 }}
                >
                  {event.title}
                </motion.div>
              ))}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 text-black flex flex-col pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        {renderCalendar()}
      </motion.div>
    </div>
  );
}
