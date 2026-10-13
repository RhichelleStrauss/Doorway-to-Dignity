
import Badge from "./Badge";
import Button from "./Button";
import logo from "../assets/figma/logo.png"
import { Link, NavLink } from "react-router-dom";
import Card from "./Card";
import TextField from "./TextField";

function LogInHero() {

return(

   
  <>

       <div className="flex h-full flex-col items-start justify-center gap-12 px-6 md:px-18 lg:px-24">
        <div>
          <NavLink to="/" className="flex items-center gap-3 md:gap-8">
          <img src={logo} alt="" className="size-[52px]" />
          <span className="text-[16px] font-semibold text-cream md:text-[18px]">
            Doorway To Dignity
          </span>
        </NavLink>
        </div>

        <div className="flex flex-col items-start gap-4">

  <Badge tone="amber">Welcome Back</Badge>

  <h1 className="max-w-[600px] text-[30px]/[38px] font-bold text-cream lg:text-[44px]/[52px]">

    Restoring Dignity, Renewing Hope, One Step at a Time
  </h1>

  <p className="max-w-[600px] text-[15px]/[24px] text-soft-amber-100 lg:text-[17px]/[26px]">
    Log in to see upcoming events, pick your role and keep track of the hours you give.
    </p>
    </div>

    
  <div className="flex flex-col items-start gap-3">
     <Badge tone="amber">DON’T HAVE AN ACCOUNT?</Badge>
     <p className="max-w-[600px] text-[15px]/[24px] text-soft-amber-100 lg:text-[17px]/[26px]">Sign up and start volunteering</p>
<Button to="/faq" variant="outline">Sign up</Button>
     </div>


  </div>


{/* left */}
  <div className="flex flex-col items-center justify-center px-6 py-12 md:px-12 lg:items-start lg:py-24 lg:pr-[73px] lg:pl-[17px]">
         <Card className="w-full max-w-[656px] p-6 md:p-9">
    <div className="flex flex-col items-center gap-1.5 text-center">
      <h2 className="text-[30px]/[36px] font-bold text-topaz-blue-800 lg:text-[36px]/[42px]">
        LOG IN
      </h2>
      <p className="text-[14px]/[20px] text-gunmetal-grey-400">
       Log in to see your upcoming events.
      </p>
    </div>


<form className="mt-6 flex flex-col gap-[15px]">
        <TextField label="Email" id="email" type="email" placeholder="you@example.com" />

        <TextField label="Password" id="password" type="password" placeholder="Enter your password" />

      <div className="flex justify-end">
        <Link to="/contact" className="text-[12px] font-medium text-topaz-blue-800 underline hover:text-topaz-blue-700">
          Forgot password?
        </Link>
      </div>

      <div className="mt-[9px] flex justify-center">
        <Button type="submit" className="w-full max-w-[240px]">Log in</Button>
      </div>
    </form>


  </Card>

  </div>

  </>

   

);

}

export default LogInHero;
