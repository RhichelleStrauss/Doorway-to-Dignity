import { NavLink } from "react-router-dom";
import Badge from "./Badge";
import Button from "./Button";
import logo from "../assets/figma/logo.png";

type AuthIntroProps = { mode: "login" | "signup" };

const copy = {
  login: {
    badge: "Welcome Back",
    heading: "Restoring Dignity, Renewing Hope, One Step at a Time",
    text: "Log in to see upcoming events, pick your role and keep track of the hours you give.",
    prompt: "Don’t have an account?",
    promptText: "Sign up and start volunteering",
    button: "Sign up",
    to: "/signup",
  },
  signup: {
    badge: "Join Us",
    heading: "Restoring Dignity, Renewing Hope, One Step at a Time",
    text: "Create an account to sign up for events and start volunteering.",
    prompt: "Already have an account?",
    promptText: "Log in to see your upcoming events",
    button: "Log in",
    to: "/login",
  },
};

function AuthIntro({ mode }: AuthIntroProps) {
  const c = copy[mode];
  const isSignup = mode === "signup";

  const align = isSignup ? "lg:items-end lg:text-right" : "";

  return (
    <div className={`flex h-full flex-col items-start justify-center px-6 py-12 md:px-12 lg:px-0 lg:py-12 ${align}`}>

    <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="" className="size-[42px]" />
          <span className="text-[16px] font-semibold text-cream lg:text-[17px]">
            Doorway To Dignity
          </span>
        </NavLink>

      <div className={`flex flex-col items-start ${align} ${isSignup ? "mt-[30px] lg:mt-[min(63px,6dvh)]" : "mt-[30px]"}`}>
        <Badge tone="amber">{c.badge}</Badge>
        <h1 className="mt-3 max-w-[720px] text-[34px]/[42px] font-bold text-topaz-blue-100 lg:text-[51px]/[58px]">
          {c.heading}
        </h1>
        <p className={`mt-5 max-w-[720px] text-[15px]/[24px] text-soft-amber-100 ${isSignup ? "lg:mt-[18px] lg:text-[15px]/[22px]" : "lg:text-[18px]/[24px]"}`}>
          {c.text}
        </p>
      </div>

      <div className={`mt-12 flex flex-col items-start ${align} ${isSignup ? "gap-[14px] lg:mt-[min(63px,6dvh)]" : "gap-5 lg:mt-[min(92px,9dvh)]"}`}>
        <Badge tone="amber">{c.prompt}</Badge>
        <p className="text-[15px]/[24px] text-soft-amber-100 lg:text-[18px]/[24px]">{c.promptText}</p>
        <Button to={c.to} variant="outline">{c.button}</Button>
      </div>
    </div>
  );
}

export default AuthIntro;
