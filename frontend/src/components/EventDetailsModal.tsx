import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Icon from "./Icon";
import calendarIcon from "../assets/icons/calendar.svg";
import clockIcon from "../assets/icons/clock.svg";
import locationIcon from "../assets/icons/globe.svg";
import closeIcon from "../assets/icons/x.svg";
import { getEventImage } from "./EventImages";
import { formatEventTime, type EventItem } from "./EventCard";

type EventDetailsModalProps = {
  event: EventItem | null;
  onClose: () => void;
  onSignedUp: () => void;
};

const fullDate = new Intl.DateTimeFormat("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

function EventDetailsModal({ event, onClose, onSignedUp }: EventDetailsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (event && !dialog.open) {
      setRole("");
      setError("");
      dialog.showModal();
    }
    if (!event && dialog.open) dialog.close();
  }, [event]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!event) return;
    if (!role) {
      setError("Please choose a role.");
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/events/${event._id}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message);
      return;
    }
    onSignedUp();
    onClose();
  }

  async function handleCancel() {
    if (!event) return;
    setError("");
    setLoading(true);

    const res = await fetch(`/api/events/${event._id}/signup`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message);
      return;
    }
    onSignedUp(); 
    onClose();
  }

  const percent = event ? Math.min(100, (event.volunteerCount / event.capacity) * 100) : 0;

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box w-[calc(100%-32px)] max-w-[840px] overflow-hidden rounded-[14px] bg-kinda-white p-0">
        {event && (
          <>
         
            <div className="relative">
              <img src={getEventImage(event.image)} alt="" className="h-[180px] w-full object-cover sm:h-[225px]" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-kinda-white text-topaz-blue-800 shadow-md"
              >
                <Icon src={closeIcon} className="size-5" />
              </button>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-[1fr_300px] md:gap-9 md:p-9">
              
              <div className="flex flex-col gap-5">
                <h2 className="text-[26px]/[32px] font-bold text-topaz-blue-800 md:text-[30px]/[36px]">{event.title}</h2>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-topaz-blue-800">
                  <span className="flex items-center gap-2">
                    <Icon src={calendarIcon} className="size-[18px] text-primary-topaz-blue-500" />
                    {fullDate.format(new Date(event.start))}
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon src={clockIcon} className="size-[18px] text-primary-topaz-blue-500" />
                    {formatEventTime(event.start, event.end)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon src={locationIcon} className="size-[18px] text-topaz-blue-800" />
                    {event.location}
                  </span>
                </div>

                {event.description && (
                  <div>
                    <h3 className="text-[16px] font-semibold text-topaz-blue-800">About this event</h3>
                    <p className="mt-2 text-[14px]/[22px] text-gunmetal-grey-400">{event.description}</p>
                  </div>
                )}

                <div>
                  <div className="flex justify-between text-[13px] font-medium text-topaz-blue-800">
                    <span>Volunteers</span>
                    <span>{event.volunteerCount} of {event.capacity} spots filled</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-soft-amber-100">
                    <div className="h-full rounded-full bg-primary-topaz-blue-500" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              </div>

              
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-[14px] border border-soft-amber-100 p-5">
                                {event.signedUp ? (
                  <>
                    <div className="rounded-[12px] bg-green-teal-100 p-4">
                      <p className="text-[15px] font-bold text-green-teal-800">You're signed up</p>
                      <p className="mt-1 text-[13px] text-green-teal-800">
                        Your role: <span className="font-semibold">{event.myRole}</span>
                      </p>
                    </div>

                    <p className="text-[12px] text-gunmetal-grey-400">You can cancel up to 24 hours before the event.</p>

                    {error && <p className="text-[13px] text-error">{error}</p>}

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="mt-auto h-[42px] min-w-[150px] self-end whitespace-nowrap rounded-[14px] border-[1.5px] border-error px-8 text-[15px] font-semibold text-error transition-colors hover:bg-error/10"
                    >
                      {loading ? "Cancelling…" : "Cancel"}
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-[17px] font-bold text-topaz-blue-800">Choose your role</h3>


                {event.roles.map((r) => {
                  const left = r.capacity - r.filled;
                  const full = left <= 0;
                  const selected = role === r.name;

                  return (
                    <label
                      key={r.name}
                      className={`flex items-center gap-3 rounded-[12px] border-[1.5px] p-3 transition-colors ${
                        full
                          ? "cursor-not-allowed border-soft-amber-100 opacity-60"
                          : selected
                            ? "cursor-pointer border-primary-topaz-blue-500 bg-topaz-blue-100"
                            : "cursor-pointer border-soft-amber-100 hover:border-topaz-blue-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={r.name}
                        checked={selected}
                        disabled={full || event.signedUp}
                        onChange={() => { setRole(r.name); setError(""); }}
                        className="peer sr-only"
                      />
                      
                      <span
                        aria-hidden="true"
                        className={`size-[20px] shrink-0 rounded-full border-2 border-topaz-blue-700 bg-topaz-blue-700 transition-shadow duration-200 ease-out peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-topaz-blue-500 ${
                          selected
                            ? "shadow-[inset_0_0_0_3px_var(--color-topaz-blue-100)]"
                            : "shadow-[inset_0_0_0_8px_var(--color-kinda-white)]"
                        }`}
                      />
                      <span className="flex flex-col">
                        <span className="text-[14px] font-semibold text-topaz-blue-800">{r.name}</span>
                        <span className={`text-[12px] ${full ? "text-[#F15152]" : "text-gunmetal-grey-400"}`}>
                          {full ? "Full" : `${left} ${left === 1 ? "spot" : "spots"} left`}
                        </span>
                      </span>
                    </label>
                  );
                })}

                    <p className="text-[12px] text-gunmetal-grey-400">You can cancel up to 24 hours before the event.</p>

                                   {error && <p className="text-[13px] text-error">{error}</p>}

                    <Button type="submit" className="mt-2 min-w-[150px] self-end whitespace-nowrap">{loading ? "Signing up…" : "Sign up"}</Button>
                  </>
                )}

              </form>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

export default EventDetailsModal;
