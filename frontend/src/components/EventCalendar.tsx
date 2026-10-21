import { useState } from "react";
import { DayPicker } from "react-day-picker";
import Card from "./Card";
import Icon from "./Icon";
import chevronIcon from "../assets/icons/chevron-down.svg";
import type { EventItem } from "./EventCard";
import type { MySignup } from "./UpcomingEvents";

type EventCalendarProps = {
  events: EventItem[];
  signups: MySignup[];
  onSelectEvent: (event: EventItem) => void;
};

type DayStatus = "mine" | "full" | "open" | "passed";

const legend = [
  { label: "Your events", className: "bg-primary-topaz-blue-500" },
  { label: "Full", className: "bg-[#F15152]" },
  { label: "Volunteers needed", className: "bg-primary-green-teal-500" },
  { label: "Passed", className: "bg-gunmetal-grey-400" },
];

const monthName = new Intl.DateTimeFormat("en-ZA", { month: "long", year: "numeric" });


function dayKey(date: Date) {
  return date.toLocaleDateString("en-CA");
}

function EventCalendar({ events, signups, onSelectEvent }: EventCalendarProps) {
  const today = new Date();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  
  const statusByDay = new Map<string, DayStatus>();
  
  const eventsByDay = new Map<string, EventItem[]>();

  for (const event of events) {
    const key = dayKey(new Date(event.start));
    eventsByDay.set(key, [...(eventsByDay.get(key) || []), event]);
    if (statusByDay.get(key) === "full") continue;
    statusByDay.set(key, event.volunteerCount >= event.capacity ? "full" : "open");
  }
  for (const signup of signups) {
    const passed = new Date(signup.event.end) < today;
    statusByDay.set(dayKey(new Date(signup.event.start)), passed ? "passed" : "mine");
  }

  const is = (status: DayStatus) => (date: Date) => statusByDay.get(dayKey(date)) === status;

  function changeMonth(step: number) {
    setMonth(new Date(month.getFullYear(), month.getMonth() + step, 1));
  }

  function handleDayClick(day: Date) {
    const dayEvents = eventsByDay.get(dayKey(day));
    if (dayEvents?.length) onSelectEvent(dayEvents[0]);
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[24px]/[32px] font-bold text-topaz-blue-800 xl:text-[28px]/[36px]">Your calendar</h2>
        <div className="flex items-center gap-3 text-topaz-blue-800">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month" className="grid size-8 place-items-center">
            <Icon src={chevronIcon} className="size-5 rotate-90" />
          </button>
          <span className="min-w-[130px] text-center text-[17px] font-semibold">{monthName.format(month)}</span>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="grid size-8 place-items-center">
            <Icon src={chevronIcon} className="size-5 -rotate-90" />
          </button>
        </div>
      </div>

      <Card className="mt-6 flex-1 p-6 md:p-9">
        <DayPicker
          month={month}
          onMonthChange={setMonth}
          hideNavigation
          showOutsideDays
          fixedWeeks
          weekStartsOn={1}
          onDayClick={handleDayClick}
          formatters={{ formatWeekdayName: (d) => d.toLocaleDateString("en-ZA", { weekday: "short" }) }}
          modifiers={{
            mine: is("mine"),
            full: is("full"),
            open: is("open"),
            passed: is("passed"),
            hasEvent: (date) => eventsByDay.has(dayKey(date)),
          }}
          modifiersClassNames={{
            mine: "[&>button]:bg-primary-topaz-blue-500 [&>button]:text-cream",
            full: "[&>button]:bg-[#F15152] [&>button]:text-cream",
            open: "[&>button]:bg-primary-green-teal-500 [&>button]:text-cream",
            passed: "[&>button]:bg-gunmetal-grey-400 [&>button]:text-cream",
            hasEvent: "[&>button]:cursor-pointer [&>button]:hover:opacity-85",
            today: "[&>button]:border-2 [&>button]:border-topaz-blue-800",
            outside: "[&>button]:!bg-transparent [&>button]:!text-gunmetal-grey-400/50 [&>button]:!border-0",
          }}
          classNames={{
            root: "w-full",
            months: "w-full",
            month: "w-full",
            month_caption: "hidden",
            month_grid: "w-full border-collapse",
            weekday: "pb-3 text-center text-[11px] font-semibold uppercase tracking-[1px] text-gunmetal-grey-400",
            week: "border-b border-soft-amber-100 last:border-b-0",
            day: "h-11 p-0 text-center",
            day_button: "mx-auto grid size-9 cursor-default place-items-center rounded-full text-[15px] text-topaz-blue-800 transition-opacity",
          }}
        />

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-gunmetal-grey-400">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-full border-2 border-topaz-blue-800" /> Today
          </span>
          {legend.map((item) => (
            <span key={item.label} className="flex items-center gap-1.5">
              <span className={`size-3 rounded-full ${item.className}`} /> {item.label}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default EventCalendar;
