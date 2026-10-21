import Card from "./Card";
import Icon from "./Icon";
import Button from "./Button";
import calendarIcon from "../assets/icons/calendar.svg";
import locationIcon from "../assets/icons/globe.svg";
import { getEventImage } from "./EventImages";

export function formatEventTime(start: string, end: string) {
  return `${shortTime(new Date(start))} – ${shortTime(new Date(end))}`;
}

export type EventItem = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  location: string;
  start: string;
  end: string;
  capacity: number;
  roles: { name: string; capacity: number; filled: number }[];
  volunteerCount: number;
  signedUp: boolean;
    myRole?: string;

};

const day = new Intl.DateTimeFormat("en-ZA", { weekday: "short", day: "numeric", month: "short" });
const time = new Intl.DateTimeFormat("en-ZA", { hour: "numeric", minute: "2-digit", hour12: true });

function shortTime(date: Date) {
  return time.format(date).replace(":00", "").replace(/\s/g, "").toLowerCase();
}

export function formatEventDate(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  return `${day.format(s).replace(",", "")} · ${shortTime(s)} – ${shortTime(e)}`;
}

type EventCardProps = {
  event: EventItem;
  onSignUp: (event: EventItem) => void;
};

function EventCard({ event, onSignUp }: EventCardProps) {
  const full = event.volunteerCount >= event.capacity;
  const percent = Math.min(100, (event.volunteerCount / event.capacity) * 100);

  return (
    <Card className="flex flex-col p-3">
           <div className="relative">
        <img src={getEventImage(event.image)} alt="" className="h-[165px] w-full rounded-[12px] object-cover" />
        {event.signedUp && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-green-teal-100 px-3 py-1 text-[12px] font-semibold text-green-teal-800 shadow-sm">
            Signed up
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-1.5 pt-3 pb-1.5">
        <h3 className="text-[20px]/[26px] font-bold text-topaz-blue-800">{event.title}</h3>

        <p className="flex items-center gap-2 text-[14px] text-gunmetal-grey-400">
          <Icon src={calendarIcon} className="size-[18px] shrink-0 text-topaz-blue-800" />
          {formatEventDate(event.start, event.end)}
        </p>

        <p className="flex items-center gap-2 text-[14px] text-gunmetal-grey-400">
          <Icon src={locationIcon} className="size-[18px] shrink-0 text-topaz-blue-800" />
          {event.location}
        </p>

        <div>
          <div className="flex justify-between text-[12px] font-medium text-topaz-blue-800">
            <span>Volunteers</span>
            <span>{event.volunteerCount} of {event.capacity}</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-soft-amber-100">
            <div className="h-full rounded-full bg-primary-topaz-blue-500" style={{ width: `${percent}%` }} />
          </div>
        </div>

                <div className="mt-auto flex justify-end pt-2">
                    {event.signedUp ? (
            <button
              type="button"
              onClick={() => onSignUp(event)}
              className="h-[42px] w-[150px] rounded-[14px] border-[1.5px] border-topaz-blue-700 text-[15px] font-semibold text-topaz-blue-700 transition-colors hover:bg-topaz-blue-700/10"
            >
              View details
            </button>
          ) : (
            <Button className="w-[150px]" onClick={() => !full && onSignUp(event)}>
              {full ? "Event full" : "Sign up"}
            </Button>
          )}

        </div>

      </div>
    </Card>
  );
}

export default EventCard;
