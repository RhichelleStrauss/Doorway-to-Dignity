import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "../components/PageBackground";
import Card from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import EventCalendar from "../components/EventCalendar";
import { getEventImage } from "../components/EventImages";
import { formatEventDate, formatEventTime, type EventItem } from "../components/EventCard";
import { useAuth } from "../context/AuthContext";
import calendarIcon from "../assets/icons/calendar.svg";
import clockIcon from "../assets/icons/clock.svg";
import locationIcon from "../assets/icons/globe.svg";
import mailIcon from "../assets/icons/mail.svg";
import phoneIcon from "../assets/icons/phone.svg";

type AdminProfile = {
  fullName: string;
  email: string;
  phone: string;
};

type EventSignup = {
  _id: string;
  role: string;
  fullName: string;
};

const fullDate = new Intl.DateTimeFormat("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [signups, setSignups] = useState<EventSignup[]>([]);
  const [showAll, setShowAll] = useState(false);

  const selected = events.find((e) => e._id === selectedId) || events[0];
  const selectedEventId = selected?._id;

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then(setProfile);

    fetch("/api/events", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : []))
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedEventId) return;
    fetch(`/api/events/${selectedEventId}/signups`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : []))
      .then(setSignups);
  }, [selectedEventId]);

  function selectEvent(event: EventItem) {
    setSelectedId(event._id);
    setShowAll(false);
  }

  function selectFromCalendar(event: EventItem) {
    selectEvent(event);
    document.getElementById("event-details")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const sortedSignups = [...signups].sort((a, b) => a.role.localeCompare(b.role));
  const visibleSignups = showAll ? sortedSignups : sortedSignups.slice(0, 5);
  const percent = selected ? Math.min(100, (selected.volunteerCount / selected.capacity) * 100) : 0;

  return (
    <main>
      <title>Admin | Doorway To Dignity (Student Project)</title>
      <PageBackground>
        <section className="grid items-stretch gap-6 px-6 pt-14 md:px-12 lg:grid-cols-[480fr_1168fr] lg:px-24">
          <div className="flex flex-col">
            <h2 className="text-[24px]/[32px] font-bold text-topaz-blue-800 xl:text-[28px]/[36px]">Your profile</h2>

            <Card variant="teal" className="mt-6 flex flex-1 flex-col items-center p-6 text-center md:p-9 bg-topaz-blue-700/80!">
              {profile ? (
                <>
                  <div className="grid size-[96px] place-items-center rounded-full border-[3px] border-primary-topaz-blue-500 bg-topaz-blue-100 text-[30px] font-bold text-topaz-blue-800">
                    {initials(profile.fullName)}
                  </div>

                  <h3 className="mt-4 text-[23px]/[28px] font-bold text-cream">{profile.fullName}</h3>
                  <span className="mt-1.5 inline-flex h-8 items-center rounded-[10px] bg-topaz-blue-100 px-3.5 text-[13px] font-semibold text-topaz-blue-800">
                    Admin
                  </span>

                  <Card variant="solid" className="mt-5 flex w-full flex-col gap-3 border-[1.5px] border-primary-topaz-blue-500 p-4 text-left text-[13px] text-topaz-blue-800">
                    <p className="flex items-center gap-3 break-all">
                      <Icon src={mailIcon} className="size-[18px] shrink-0" />
                      {profile.email}
                    </p>
                    {profile.phone && (
                      <p className="flex items-center gap-3">
                        <Icon src={phoneIcon} className="size-[18px] shrink-0" />
                        {profile.phone}
                      </p>
                    )}
                  </Card>

                  <div className="mt-auto w-full pt-10 sm:w-auto">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="h-[42px] w-full rounded-[14px] sm:w-[150px] border-[1.5px] border-error text-[15px] font-semibold text-error transition-colors hover:bg-error/20"
                    >
                      Log out
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-cream">Loading your profile…</p>
              )}
            </Card>
          </div>

          <EventCalendar events={events} signups={[]} onSelectEvent={selectFromCalendar} />
        </section>

        <section className="px-6 py-14 md:px-12 lg:px-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[24px]/[32px] font-bold text-topaz-blue-800 xl:text-[28px]/[36px]">Upcoming events</h2>
            <Button to="/admin/create" className="min-w-[150px]">+ Create event</Button>
          </div>

          {loading ? (
            <p className="mt-6 text-gunmetal-grey-400">Loading events…</p>
          ) : !selected ? (
            <p className="mt-6 text-gunmetal-grey-400">There are no upcoming events yet. Create one to get started.</p>
          ) : (
            <div className="mt-6 grid gap-6 lg:grid-cols-[520fr_1128fr]">
              <Card className="relative lg:min-h-[360px]">
                <div className="flex flex-col gap-3 p-4 lg:absolute lg:inset-0 lg:overflow-y-auto">
                {events.map((event) => {
                  const active = event._id === selected._id;
                  return (
                    <button
                      key={event._id}
                      type="button"
                      onClick={() => selectEvent(event)}
                      aria-pressed={active}
                      className={`flex items-center gap-4 rounded-[12px] border-[1.5px] p-3 text-left transition-colors ${
                        active
                          ? "border-primary-topaz-blue-500 bg-topaz-blue-100/60"
                          : "border-transparent bg-kinda-white hover:border-topaz-blue-300"
                      }`}
                    >
                      <img src={getEventImage(event.image)} alt="" className="size-[60px] shrink-0 rounded-[10px] object-cover" />
                      <div className="flex min-w-0 flex-col items-start gap-1">
                        <h3 className="text-[17px]/[22px] font-bold text-topaz-blue-800">{event.title}</h3>
                        <p className="text-[13px] text-gunmetal-grey-400">{formatEventDate(event.start, event.end)}</p>
                        <span
                          className={`inline-flex h-8 items-center rounded-[10px] px-3 text-[12px] font-semibold text-topaz-blue-800 ${
                            active ? "bg-topaz-blue-200" : "bg-topaz-blue-100"
                          }`}
                        >
                          {event.volunteerCount} of {event.capacity} volunteers
                        </span>
                      </div>
                    </button>
                  );
                })}
                </div>
              </Card>

              <Card className="p-6 md:p-9">
                                <div id="event-details" className="flex scroll-mt-28 flex-col gap-6 md:flex-row">
<img
                    src={getEventImage(selected.image)}
                    alt=""
                    className="h-[200px] w-full rounded-[12px] object-cover md:h-[165px] md:w-[235px] md:shrink-0"
                  />

                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <h3 className="text-[24px]/[30px] font-bold text-topaz-blue-800 xl:text-[28px]/[34px]">{selected.title}</h3>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-topaz-blue-800">
                      <span className="flex items-center gap-2">
                        <Icon src={calendarIcon} className="size-[18px] shrink-0" />
                        {fullDate.format(new Date(selected.start))}
                      </span>
                      <span className="flex items-center gap-2">
                        <Icon src={clockIcon} className="size-[18px] shrink-0" />
                        {formatEventTime(selected.start, selected.end)}
                      </span>
                      <span className="flex items-center gap-2">
                        <Icon src={locationIcon} className="size-[18px] shrink-0" />
                        {selected.location}
                      </span>
                    </div>

                    {selected.description && (
                      <p className="text-[14px]/[22px] text-gunmetal-grey-400">{selected.description}</p>
                    )}

                    <div className="mt-auto pt-2">
                      <div className="flex justify-between text-[12px] font-medium text-topaz-blue-800">
                        <span>Volunteers</span>
                        <span>{selected.volunteerCount} of {selected.capacity} spots filled</span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-soft-amber-100">
                        <div className="h-full rounded-full bg-primary-topaz-blue-500" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="mt-8 text-[18px]/[24px] font-bold text-topaz-blue-800">Who's signed up</h4>

                {signups.length === 0 ? (
                  <p className="mt-3 text-[14px] text-gunmetal-grey-400">No one has signed up for this event yet.</p>
                ) : (
                  <>
                    <div className="mt-4 grid grid-cols-2 gap-4 border-b-[1.5px] border-gunmetal-grey-200 pb-3 text-[15px] font-semibold text-gunmetal-grey-400">
                      <span>Role</span>
                      <span>Volunteer</span>
                    </div>
                    <ul className="divide-y divide-gunmetal-grey-200">
                      {visibleSignups.map((signup) => (
                        <li key={signup._id} className="grid grid-cols-2 gap-4 py-3.5 text-[15px]">
                          <span className="text-primary-gunmetal-grey-500">{signup.role}</span>
                          <span className="text-topaz-blue-800">{signup.fullName}</span>
                        </li>
                      ))}
                    </ul>

                    {signups.length > 5 && (
                      <button
                        type="button"
                        onClick={() => setShowAll(!showAll)}
                        className="mt-3 text-[13px] font-semibold text-topaz-blue-700 underline"
                      >
                        {showAll ? "Show less" : `+ ${signups.length - 5} more volunteers`}
                      </button>
                    )}
                  </>
                )}
              </Card>
            </div>
          )}
        </section>
      </PageBackground>
    </main>
  );
}

export default AdminDashboard;
