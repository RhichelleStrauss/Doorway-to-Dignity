import { useState } from "react";
import Card from "./Card";
import { getEventImage } from "./EventImages";
import { formatEventDate, type EventItem } from "./EventCard";

export type MySignup = {
  _id: string;
  role: string;
  event: Omit<EventItem, "volunteerCount" | "signedUp">;
};

type UpcomingEventsProps = {
  signups: MySignup[];
};

function UpcomingEvents({ signups }: UpcomingEventsProps) {
  const [showAll, setShowAll] = useState(false);

  
  const upcoming = signups
    .filter((s) => new Date(s.event.end) >= new Date())
    .sort((a, b) => new Date(a.event.start).getTime() - new Date(b.event.start).getTime());

  const visible = showAll ? upcoming : upcoming.slice(0, 3);

    return (
    <div className="flex flex-col">
      <h2 className="text-[24px]/[32px] font-bold text-topaz-blue-800 xl:text-[28px]/[36px]">Your upcoming events</h2>

      {upcoming.length === 0 ? (
        <Card className="mt-6 p-6">
          <p className="text-[15px]/[24px] text-gunmetal-grey-400">
            You haven't signed up for any events yet. Choose one below to get started.
          </p>
        </Card>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {visible.map((signup) => (
            <li key={signup._id}>
              <Card className="flex items-center gap-4 p-4">
                <img
                  src={getEventImage(signup.event.image)}
                  alt=""
                  className="size-[72px] shrink-0 rounded-[10px] object-cover"
                />
                <div className="flex min-w-0 flex-col items-start gap-1">
                  <h3 className="text-[18px]/[24px] font-bold text-topaz-blue-800">{signup.event.title}</h3>
                  <p className="text-[13px] text-gunmetal-grey-400">{formatEventDate(signup.event.start, signup.event.end)}</p>
                  <span className="inline-flex h-8 items-center rounded-[10px] bg-topaz-blue-100 px-3 text-[12px] font-semibold text-topaz-blue-800">
                    {signup.role}
                  </span>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {upcoming.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-4 self-start text-[14px] font-semibold text-topaz-blue-700 underline"
        >
          {showAll ? "Show less" : "View all events"}
        </button>
      )}
    </div>
  );

}

export default UpcomingEvents;
