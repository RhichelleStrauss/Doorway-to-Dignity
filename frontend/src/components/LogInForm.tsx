
import Button from "./Button";
import { Link } from "react-router-dom";
import Card from "./Card";
import TextField from "./TextField";

function LogInForm() {
return <>
<div className="flex w-full flex-col items-center justify-center px-6 py-12 md:px-12 lg:items-start lg:px-0 lg:py-12">
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
}


export default LogInForm; 