import { useEffect, useState } from "react";
import PageBackground from "../components/PageBackground";
import EventCard, { type EventItem } from "../components/EventCard";
import UpcomingEvents, { type MySignup } from "../components/UpcomingEvents";
import EventCalendar from "../components/EventCalendar";
import EventDetailsModal from "../components/EventDetailsModal";


type Filter = "all" | "month" | "needs";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All events" },
  { value: "month", label: "This month" },
  { value: "needs", label: "Needs volunteers" },
];


function VolunteerDashboard() {
    const [filter, setFilter] = useState<Filter>("all");

    
    
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [signups, setSignups] = useState<MySignup[]>([]);
    
    
    const now = new Date();
    const filteredEvents = events.filter((event) => {
      const start = new Date(event.start);
      if (filter === "month") {
        return start.getMonth() === now.getMonth() && start.getFullYear() === now.getFullYear();
      }
      if (filter === "needs") {
        return event.volunteerCount < event.capacity;
      }
      return true;
    });
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

    function loadEvents() {
    fetch("/api/events", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : []))
      .then(setEvents)
      .finally(() => setLoading(false));

    fetch("/api/events/mine", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : []))
      .then(setSignups);
  }


  useEffect(() => {
    loadEvents();
  }, []);


  return (
    <main>
      <title>Dashboard | Doorway To Dignity (Student Project)</title>
      <PageBackground>
                <section className="grid gap-6 px-6 pt-14 md:px-12 lg:grid-cols-[520fr_1128fr] lg:px-24">
          <UpcomingEvents signups={signups} />
                   <EventCalendar events={events} signups={signups} onSelectEvent={setSelectedEvent} />


        </section>


        <section className="px-6 py-14 md:px-12 lg:px-24">
                   <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-[24px]/[32px] font-bold text-topaz-blue-800 xl:text-[28px]/[36px]">Available events</h2>

            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  aria-pressed={filter === f.value}
                  className={`h-[42px] min-w-[150px] rounded-[14px] px-5 text-[15px] font-semibold transition-colors ${
                    filter === f.value
                      ? "bg-topaz-blue-700 text-cream"
                      : "border-[1.5px] border-topaz-blue-700 text-topaz-blue-800 hover:bg-topaz-blue-700/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>


                    {loading ? (
            <p className="mt-6 text-gunmetal-grey-400">Loading events…</p>
          ) : filteredEvents.length === 0 ? (
            <p className="mt-6 text-gunmetal-grey-400">No events match this filter.</p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} onSignUp={setSelectedEvent} />
              ))}
            </div>
          )}

           
        </section>
      </PageBackground>

        

      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onSignedUp={loadEvents}
      />
    </main>

    
  );
}

export default VolunteerDashboard;
