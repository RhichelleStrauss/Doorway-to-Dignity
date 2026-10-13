import Background from "../components/Background";
import AuthText from "../components/AuthText";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import heroImage from "../assets/images/PlaceholderImage3.jpeg";

type AuthPageProps = { mode: "login" | "signup" };

function AuthPage({ mode }: AuthPageProps) {
  const isSignup = mode === "signup";
  const slide = "transition-all duration-700 ease-in-out motion-reduce:transition-none";

  const textSide = isSignup ? "lg:translate-x-[66.667%] lg:pl-12 lg:pr-24" : "lg:pl-24 lg:pr-12";
  const formSide = isSignup ? "lg:-translate-x-[150%] lg:pl-[73px] lg:pr-[17px]" : "lg:pl-[17px] lg:pr-[73px]";

  return (
    <main>
      <Background image={heroImage} className="min-h-dvh">
        <div className="flex min-h-dvh flex-col lg:flex-row">
          <div className={`lg:w-[60%] ${slide} ${textSide}`}>
            <AuthText mode={mode} />
          </div>

          <div className={`flex items-center justify-center lg:w-[40%] ${slide} ${formSide}`}>
            {isSignup ? <SignUpForm /> : <LogInForm />}
          </div>
        </div>
      </Background>
    </main>
  );
}

export default AuthPage;
