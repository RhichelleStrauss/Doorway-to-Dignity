import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";
import TextField from "./TextField";

function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ fullName, email, phone, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message);
      return;
    }

    navigate("/login");
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 md:px-12 lg:items-start lg:px-0 lg:py-12">
        <Card className="w-full max-w-[656px] p-6 md:p-9">
          <div className="flex flex-col items-start gap-1.5 text-left">
            <h2 className="text-[30px]/[36px] font-bold text-topaz-blue-800 lg:text-[36px]/[42px]">
              SIGN UP
            </h2>
            <p className="text-[14px]/[20px] text-gunmetal-grey-400">
              Sign up to see your upcoming events.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-[15px]"
          >
            <TextField
              label="Full name"
              id="fullName"
              placeholder="Your full name"
              value={fullName}
              onChange={setFullName}
            />
            <TextField
              label="Email"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
            />
            <TextField
              label="Phone number"
              id="phone"
              type="tel"
              placeholder="+27 000 000 0000"
              value={phone}
              onChange={setPhone}
            />

            <div className="grid gap-[15px] sm:grid-cols-2 sm:gap-3">
              <TextField
                label="Password"
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={setPassword}
              />
              <TextField
                label="Confirm password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </div>

            {error && <p className="text-[13px] text-error">{error}</p>}

            <div className="mt-[9px] flex justify-end">
              <Button type="submit" className="min-w-[150px] whitespace-nowrap">
                {loading ? "Signing up…" : "Sign up"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignUpForm;
