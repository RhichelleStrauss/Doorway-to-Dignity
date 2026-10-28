import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";
import TextField from "./TextField";
import { useAuth } from "../context/AuthContext";

function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {

    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setUser(data);
    navigate(data.role === "admin" ? "/admin" : "/dashboard");


  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 md:px-12 lg:items-start lg:px-0 lg:py-12">
        <Card className="w-full max-w-[656px] p-6 md:p-9">
          <div className="flex flex-col items-start gap-1.5 text-left">
            <h2 className="text-[30px]/[36px] font-bold text-topaz-blue-800 lg:text-[36px]/[42px]">
              LOG IN
            </h2>
            <p className="text-[14px]/[20px] text-gunmetal-grey-400">
              Log in to see your upcoming events.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-[15px]"
          >
            <TextField
              label="Email"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
            />
            <TextField
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
            />

            <div className="flex justify-end">
              <Link
                to="/contact"
                className="text-[12px] font-medium text-topaz-blue-800 underline hover:text-topaz-blue-700"
              >
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-[13px] text-error">{error}</p>}

            <div className="mt-[9px] flex justify-end">
              <Button type="submit" className="min-w-[150px] whitespace-nowrap">
                {loading ? "Logging in…" : "Log in"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}

export default LogInForm;
