import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "../components/PageBackground";
import Card from "../components/Card";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Button from "../components/Button";
import { getEventImage } from "../components/EventImages";
import type { EventItem } from "../components/EventCard";
import type { MySignup } from "../components/UpcomingEvents";
import { useAuth } from "../context/AuthContext";

type ProfileData = {
  fullName: string;
  email: string;
  phone: string;
  role: "volunteer" | "admin";
  preferredRole?: string;
};


function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [signups, setSignups] = useState<MySignup[]>([]);
  const [roleOptions, setRoleOptions] = useState<string[]>([]);
  const [tab, setTab] = useState<"details" | "past">("details");

 
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", preferredRole: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  function loadProfile() {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then(setProfile);
  }

  useEffect(() => {
    loadProfile();

    fetch("/api/events/mine", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : []))
      .then(setSignups);

    
    fetch("/api/events", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : []))
      .then((events: EventItem[]) => {
        const names = events.flatMap((e) => e.roles.map((r) => r.name));
        setRoleOptions([...new Set(names)]);
      });
  }, []);

  
  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        preferredRole: profile.preferredRole || "",
      });
    }
  }, [profile]);

 
  const pastSignups = signups
    .filter((s) => new Date(s.event.end) < new Date())
    .sort((a, b) => new Date(b.event.start).getTime() - new Date(a.event.start).getTime());

  const hoursGiven = Math.round(
    pastSignups.reduce((total, s) => total + (new Date(s.event.end).getTime() - new Date(s.event.start).getTime()), 0) / 3_600_000
  );

  function updateField(field: keyof typeof form) {
    return (value: string) => setForm({ ...form, [field]: value });
  }

  async function handleSave(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    const res = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.message);
      return;
    }
    setMessage("Your changes have been saved.");
    loadProfile();
  }

  function handleDiscard() {
    if (!profile) return;
    setForm({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      preferredRole: profile.preferredRole || "",
    });
    setMessage("");
    setError("");
  }

  async function handleChangePassword() {
    setPasswordMessage("");
    const res = await fetch("/api/users/me/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    setPasswordMessage(data.message);
    if (res.ok) {
      setCurrentPassword("");
      setNewPassword("");
      setShowPassword(false);
    }
  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <main>
      <title>My profile | Doorway To Dignity (Student Project)</title>
      <PageBackground>
        <section className="grid items-stretch gap-6 px-6 pt-[30px] pb-14 md:px-12 lg:grid-cols-[480fr_1168fr] lg:px-24">

       
          {profile ? (
            <Card className="flex flex-col items-center p-6 text-center md:p-9 lg:min-h-[675px]">
              <div className="grid size-[108px] place-items-center rounded-full border-[3px] border-primary-topaz-blue-500 bg-topaz-blue-100 text-[34px] font-bold text-topaz-blue-800">
                {initials(profile.fullName)}
              </div>

              <h1 className="mt-[18px] text-[22px]/[26px] font-bold text-topaz-blue-800">{profile.fullName}</h1>
              <p className="mt-[3px] text-[13px]/[17px] text-gunmetal-grey-400">{profile.email}</p>

              {profile.preferredRole && (
                <span className="mt-[18px] inline-flex h-8 items-center rounded-[10px] bg-topaz-blue-100 px-3 text-[12px] font-semibold text-topaz-blue-800">
                  {profile.preferredRole}
                </span>
              )}

              <div className="mt-[18px] grid w-full grid-cols-2 gap-3">
                <div className="flex h-[68px] flex-col items-center justify-center rounded-[12px] bg-primary-soft-amber-500/70">
                  <p className="text-[24px]/[28px] font-bold text-topaz-blue-700">{pastSignups.length}</p>
                  <p className="text-[12px]/[15px] text-gunmetal-grey-400">Events</p>
                </div>
                <div className="flex h-[68px] flex-col items-center justify-center rounded-[12px] bg-primary-soft-amber-500/70">
                  <p className="text-[24px]/[28px] font-bold text-topaz-blue-700">{hoursGiven}</p>
                  <p className="text-[12px]/[15px] text-gunmetal-grey-400">Hours given</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-8 h-[42px] w-full rounded-[14px] sm:w-[150px] border-[1.5px] border-error text-[15px] font-semibold text-error transition-colors hover:bg-error/10 lg:mt-auto lg:self-end"
              >
                Log out
              </button>
            </Card>
          ) : (
            <Card className="p-9 text-gunmetal-grey-400">Loading your profile…</Card>
          )}

          <Card className="flex flex-col p-6 md:p-9 lg:min-h-[675px]">
           
            <div className="flex max-w-[390px] border-b border-soft-amber-100">
              {[
                { value: "details", label: "Profile details" },
                { value: "past", label: `Past events (${pastSignups.length})` },
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTab(t.value as "details" | "past")}
                  className={`-mb-px flex-1 border-b-2 pb-3 text-center text-[15px] font-semibold transition-colors ${
                    tab === t.value
                      ? "border-primary-topaz-blue-500 text-topaz-blue-800"
                      : "border-transparent text-gunmetal-grey-400 hover:text-topaz-blue-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "details" ? (
              <form onSubmit={handleSave} className="mt-6 flex flex-1 flex-col gap-[18px]">
                <div className="grid gap-x-6 gap-y-[18px] md:grid-cols-2">
                  <TextField label="Full name" id="fullName" value={form.fullName} onChange={updateField("fullName")} />
                  <TextField label="Email" id="email" type="email" value={form.email} onChange={updateField("email")} />
                  <TextField label="Phone number" id="phone" type="tel" value={form.phone} onChange={updateField("phone")} />
                  <SelectField
                    label="Preferred role"
                    id="preferredRole"
                    placeholder="Choose a role"
                    options={roleOptions}
                    value={form.preferredRole}
                    onChange={updateField("preferredRole")}
                  />
                </div>

                <div>
                  {!showPassword ? (
                    <button
                      type="button"
                      onClick={() => setShowPassword(true)}
                      className="text-[13px] font-semibold text-topaz-blue-700 underline"
                    >
                      Change password
                    </button>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label="Current password" id="currentPassword" type="password" value={currentPassword} onChange={setCurrentPassword} />
                      <TextField label="New password" id="newPassword" type="password" value={newPassword} onChange={setNewPassword} />
                      <div className="flex items-center gap-4 md:col-span-2">
                        <Button type="button" onClick={handleChangePassword}>Update password</Button>
                        <button
                          type="button"
                          onClick={() => setShowPassword(false)}
                          className="text-[14px] font-semibold text-topaz-blue-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  {passwordMessage && <p className="mt-2 text-[13px] text-topaz-blue-700">{passwordMessage}</p>}
                </div>

                {error && <p className="text-[13px] text-error">{error}</p>}
                {message && <p className="text-[13px] text-topaz-blue-700">{message}</p>}

                <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="h-[42px] whitespace-nowrap rounded-[14px] border-[1.5px] border-topaz-blue-700 px-8 text-[15px] font-semibold text-topaz-blue-700 transition-colors hover:bg-topaz-blue-700/10 sm:min-w-[150px]"
                  >
                    Discard
                  </button>
                  <Button type="submit" className="whitespace-nowrap sm:min-w-[150px]">{saving ? "Saving…" : "Save changes"}</Button>
                </div>
              </form>
            ) : (
              <div className="mt-6 flex flex-col gap-4">
                {pastSignups.length === 0 ? (
                  <p className="text-gunmetal-grey-400">You haven't completed any events yet.</p>
                ) : (
                  pastSignups.map((s) => (
                    <Card key={s._id} variant="solid" className="flex items-center gap-4 p-3">
                      <img
                        src={getEventImage(s.event.image)}
                        alt=""
                        className="size-[60px] shrink-0 rounded-[10px] object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[17px] font-bold text-topaz-blue-800">{s.event.title}</h3>
                        <p className="text-[13px] text-gunmetal-grey-400">
                          {new Date(s.event.start).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })} · {s.role}
                        </p>
                      </div>
                      <span className="inline-flex h-8 shrink-0 items-center rounded-[10px] bg-topaz-blue-100 px-3 text-[12px] font-semibold text-topaz-blue-800">
                        Completed
                      </span>
                    </Card>
                  ))
                )}
              </div>
            )}
          </Card>
        </section>
      </PageBackground>
    </main>
  );
}

export default Profile;
