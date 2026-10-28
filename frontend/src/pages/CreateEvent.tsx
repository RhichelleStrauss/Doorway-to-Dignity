import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import PageBackground from "../components/PageBackground";
import Card from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import { eventImages } from "../components/EventImages";
import trashIcon from "../assets/icons/trash-2.svg";
import chevronIcon from "../assets/icons/chevron-down.svg";

type RoleRow = {
  name: string;
  capacity: string;
};

const inputClass =
  "input h-[42px] w-full rounded-[14px] border-[1.5px] border-topaz-blue-700 bg-transparent text-[15px] text-topaz-blue-800 placeholder:text-gunmetal-grey-400 not-placeholder-shown:border-primary-topaz-blue-500 not-placeholder-shown:bg-topaz-blue-100 focus:border-primary-topaz-blue-500 focus:ring-4 focus:ring-primary-topaz-blue-500/30 focus:outline-none";

const imageOptions = Object.entries(eventImages).map(([key, src]) => ({
  key,
  src,
  label: key
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" "),
}));

const roleOptions = [
  "Cooking",
  "Designating food",
  "Inventory management",
  "Packing jars",
  "Serving",
  "Set-up & clean-up",
  "Tracking people",
];

const timeOptions = Array.from({ length: 31 }, (_, i) => {
  const minutes = 6 * 60 + i * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${minutes % 60 === 0 ? "00" : "30"}`;
});

const longDate = new Intl.DateTimeFormat("en-ZA", { weekday: "short", day: "numeric", month: "long", year: "numeric" });


function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    image: imageOptions[0].key,
  });
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const selectedDate = form.date ? new Date(`${form.date}T00:00`) : undefined;

  function updateField(field: keyof typeof form) {
    return (value: string) => setForm({ ...form, [field]: value });
  }

  function addRole() {
    setRoles([...roles, { name: "", capacity: "1" }]);
  }

  function updateRole(index: number, field: keyof RoleRow, value: string) {
    setRoles(roles.map((role, i) => (i === index ? { ...role, [field]: value } : role)));
  }

  function removeRole(index: number) {
    setRoles(roles.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.location.trim() || !form.date || !form.startTime || !form.endTime) {
      setError("Please fill in the event name, location, date and times.");
      return;
    }

    const start = new Date(`${form.date}T${form.startTime}`);
    const end = new Date(`${form.date}T${form.endTime}`);

    if (start < new Date()) {
      setError("The event can't start in the past.");
      return;
    }
    if (end <= start) {
      setError("The end time must be after the start time.");
      return;
    }

    const cleanRoles = roles
      .filter((role) => role.name.trim())
      .map((role) => ({ name: role.name.trim(), capacity: Number(role.capacity) }));

    if (cleanRoles.length === 0) {
      setError("Please add at least one role.");
      return;
    }
    if (cleanRoles.some((role) => !Number.isInteger(role.capacity) || role.capacity < 1)) {
      setError("Each role needs at least 1 spot.");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: form.title.trim(),
        description: form.description.trim(),
        image: form.image,
        location: form.location.trim(),
        start: start.toISOString(),
        end: end.toISOString(),
        roles: cleanRoles,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok) {
      setError(data.message || "Something went wrong. Please try again.");
      return;
    }
    navigate("/admin");
  }

  return (
    <main>
      <title>Create event | Doorway To Dignity (Student Project)</title>
      <PageBackground>
        <section className="px-6 py-14 md:px-12 lg:px-24">
          <h1 className="text-[32px]/[40px] font-bold text-topaz-blue-800 xl:text-[36px]/[44px]">Create event</h1>
          <p className="mt-1 text-[15px] text-gunmetal-grey-400">Fill in the details volunteers will see when they sign up.</p>

          <Card className="mt-6 p-6 md:p-9">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-9 lg:grid-cols-3">
                <div className="flex flex-col gap-3">
                  <h2 className="text-[18px]/[24px] font-bold text-topaz-blue-800">Event details</h2>
                  <TextField label="Event name" id="title" placeholder="e.g. Jars Of Hope" value={form.title} onChange={updateField("title")} />
                  <TextField label="Location" id="location" placeholder="Suburb or venue" value={form.location} onChange={updateField("location")} />
                  <fieldset className="fieldset relative" onKeyDown={(e) => e.key === "Escape" && setCalendarOpen(false)}>
                    <label className="text-[15px] font-medium text-topaz-blue-800" htmlFor="date">Date</label>
                    <button
                      id="date"
                      type="button"
                      onClick={() => setCalendarOpen(!calendarOpen)}
                      aria-expanded={calendarOpen}
                      className="flex h-[42px] w-full items-center justify-between rounded-[14px] border-[1.5px] border-topaz-blue-700 bg-topaz-blue-100 px-[18px] text-[15px] text-topaz-blue-800 focus:border-primary-topaz-blue-500 focus:ring-4 focus:ring-primary-topaz-blue-500/30 focus:outline-none"
                    >
                      <span className={selectedDate ? "" : "text-gunmetal-grey-400"}>
                        {selectedDate ? longDate.format(selectedDate) : "Select a date"}
                      </span>
                      <span aria-hidden="true" className={`text-[11px] transition-transform ${calendarOpen ? "rotate-180" : ""}`}>▼</span>
                    </button>

                    {calendarOpen && (
                      <>
                        <button
                          type="button"
                          aria-label="Close calendar"
                          onClick={() => setCalendarOpen(false)}
                          className="fixed inset-0 z-20 cursor-default"
                        />
                        <div className="absolute top-full left-0 z-30 mt-0.5 w-[320px] max-w-full rounded-[14px] border-[1.5px] border-topaz-blue-800 bg-topaz-blue-100 p-4 shadow-[0_12px_40px_rgba(8,74,79,0.18)]">
                          <DayPicker
                            mode="single"
                            selected={selectedDate}
                            defaultMonth={selectedDate}
                            onSelect={(day) => {
                              if (day) updateField("date")(day.toLocaleDateString("en-CA"));
                              setCalendarOpen(false);
                            }}
                            disabled={{ before: new Date() }}
                            weekStartsOn={1}
                            showOutsideDays
                            formatters={{ formatWeekdayName: (d) => d.toLocaleDateString("en-ZA", { weekday: "short" }) }}
                            classNames={{
                              root: "w-full",
                              months: "relative",
                              month: "w-full",
                              month_caption: "flex h-9 items-center px-1 text-[15px] font-semibold text-topaz-blue-800",
                              nav: "absolute top-0 right-0 z-10 flex gap-1",
                              button_previous: "grid size-9 place-items-center rounded-full hover:bg-topaz-blue-200 disabled:opacity-30",
                              button_next: "grid size-9 place-items-center rounded-full hover:bg-topaz-blue-200 disabled:opacity-30",
                              chevron: "size-4 fill-topaz-blue-800",
                              month_grid: "mt-2 w-full border-collapse",
                              weekday: "pb-2 text-center text-[11px] font-semibold uppercase tracking-[1px] text-gunmetal-grey-400",
                              day: "h-10 p-0 text-center",
                              day_button: "mx-auto grid size-9 place-items-center rounded-full text-[14px] text-topaz-blue-800 transition-colors hover:bg-topaz-blue-200",
                              selected: "[&>button]:bg-primary-topaz-blue-500! [&>button]:font-semibold [&>button]:text-cream",
                              today: "[&>button]:border-2 [&>button]:border-topaz-blue-800",
                              outside: "[&>button]:text-gunmetal-grey-400/50",
                              disabled: "[&>button]:cursor-default [&>button]:text-gunmetal-grey-400/40 [&>button]:hover:bg-transparent",
                            }}
                          />
                        </div>
                      </>
                    )}
                  </fieldset>

                  <div className="grid grid-cols-2 gap-4">
                    <SelectField
                      label="Starts"
                      id="startTime"
                      placeholder="Start time"
                      options={timeOptions.slice(0, -1)}
                      value={form.startTime}
                      onChange={(value) => setForm({ ...form, startTime: value, endTime: form.endTime > value ? form.endTime : "" })}
                    />
                    <SelectField
                      label="Ends"
                      id="endTime"
                      placeholder="End time"
                      options={timeOptions.filter((time) => time > form.startTime)}
                      value={form.endTime}
                      onChange={updateField("endTime")}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-[18px]/[24px] font-bold text-topaz-blue-800">Description</h2>
                  <TextField
                    label="What will volunteers do?"
                    id="description"
                    multiline
                    placeholder="Describe the event, what to bring and who it helps…"
                    value={form.description}
                    onChange={updateField("description")}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-[18px]/[24px] font-bold text-topaz-blue-800">Roles needed</h2>

                  {roles.length === 0 ? (
                    <Card variant="solid" className="p-5 text-center">
                      <p className="text-[14px] font-semibold text-topaz-blue-800">No roles yet</p>
                      <p className="mt-1 text-[13px] text-gunmetal-grey-400">
                        Add the jobs you need help with and how many people each needs.
                      </p>
                    </Card>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-[1fr_80px_32px] gap-3 text-[15px] font-medium text-topaz-blue-800">
                        <span>Role</span>
                        <span>Spots</span>
                        <span />
                      </div>
                      {roles.map((role, index) => (
                        <div key={index} className="grid grid-cols-[1fr_80px_32px] items-center gap-3">
                                                    <select
                            aria-label={`Role ${index + 1} name`}
                            value={role.name}
                            onChange={(e) => updateRole(index, "name", e.target.value)}
                            className="select-dignity flex h-[42px] w-full items-center rounded-[14px] border-[1.5px] border-topaz-blue-700 bg-topaz-blue-100 px-[18px] text-[15px] text-topaz-blue-800 focus:border-primary-topaz-blue-500 focus:ring-4 focus:ring-primary-topaz-blue-500/30 focus:outline-none"
                          >
                            <option value="" disabled>Choose a role</option>
                            {roleOptions
                              .filter((name) => name === role.name || !roles.some((r) => r.name === name))
                              .map((name) => (
                                <option key={name} value={name}>{name}</option>
                              ))}
                          </select>

                          
                          <div className="relative">
                            <input
                              type="number"
                              min={1}
                              placeholder=" "
                              aria-label={`Role ${index + 1} spots`}
                              value={role.capacity}
                              onChange={(e) => updateRole(index, "capacity", e.target.value)}
                              className={`${inputClass} pr-8 pl-3.5 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                            />
                            <div className="absolute inset-y-0 right-2 flex flex-col justify-center">
                              <button
                                type="button"
                                tabIndex={-1}
                                aria-label={`More spots for role ${index + 1}`}
                                onClick={() => updateRole(index, "capacity", String((Number(role.capacity) || 0) + 1))}
                                className="grid h-4 w-5 place-items-center text-topaz-blue-800 transition-colors hover:text-primary-topaz-blue-500"
                              >
                                <Icon src={chevronIcon} className="size-3.5 rotate-180" />
                              </button>
                              <button
                                type="button"
                                tabIndex={-1}
                                aria-label={`Fewer spots for role ${index + 1}`}
                                onClick={() => updateRole(index, "capacity", String(Math.max(1, (Number(role.capacity) || 1) - 1)))}
                                className="grid h-4 w-5 place-items-center text-topaz-blue-800 transition-colors hover:text-primary-topaz-blue-500"
                              >
                                <Icon src={chevronIcon} className="size-3.5" />
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeRole(index)}
                            aria-label={`Remove role ${index + 1}`}
                            className="grid size-8 place-items-center text-error transition-opacity hover:opacity-70"
                          >
                            <Icon src={trashIcon} className="size-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                                    {roles.length < roleOptions.length && (
                    <button
                      type="button"
                      onClick={addRole}
                      className={`h-[42px] min-w-[150px] self-end whitespace-nowrap rounded-[14px] ${roles.length > 0 ? "mr-11" : ""} border-[1.5px] border-topaz-blue-700 px-8 text-[15px] font-semibold text-topaz-blue-700 transition-colors hover:bg-topaz-blue-700/10`}
                    >
                      + Add role
                    </button>
                  )}


                </div>
              </div>

              <div className="mt-9 border-t border-gunmetal-grey-200 pt-9">
                <h2 className="text-[18px]/[24px] font-bold text-topaz-blue-800">Event image</h2>
                <p className="mt-1 text-[13px] text-gunmetal-grey-400">Shown on the event card and in the event details.</p>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {imageOptions.map((option) => (
                    <label
                      key={option.key}
                      className="cursor-pointer rounded-[14px] border-[1.5px] border-transparent bg-kinda-white p-2 transition-colors hover:border-topaz-blue-300 has-[:checked]:border-primary-topaz-blue-500 has-[:checked]:bg-topaz-blue-100/60 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary-topaz-blue-500/30"
                    >
                      <input
                        type="radio"
                        name="image"
                        value={option.key}
                        checked={form.image === option.key}
                        onChange={() => updateField("image")(option.key)}
                        className="sr-only"
                      />
                      <img src={option.src} alt="" className="h-[140px] w-full rounded-[10px] object-cover" />
                      <span className="mt-2 block text-center text-[14px] font-semibold text-topaz-blue-800">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {error && <p className="mt-6 text-[14px] text-error">{error}</p>}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="h-[42px] whitespace-nowrap rounded-[14px] border-[1.5px] border-topaz-blue-700 px-8 text-[15px] font-semibold text-topaz-blue-700 transition-colors hover:bg-topaz-blue-700/10 sm:min-w-[150px]"
                >
                  Cancel
                </button>
                <Button type="submit" className="whitespace-nowrap sm:min-w-[150px]">{saving ? "Creating…" : "Create event"}</Button>
              </div>
            </form>
          </Card>
        </section>
      </PageBackground>
    </main>
  );
}

export default CreateEvent;
