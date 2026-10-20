import { useState } from "react";
import Icon from "./Icon";
import eyeIcon from "../assets/icons/eye.svg";
import eyeOffIcon from "../assets/icons/eye-off.svg";


type TextFieldProps = {
    label: string;
    id: string;
    placeholder?: string;
    type?: "text" | "email" | "password" | "tel";
    state?: "default" | "error";
    multiline?: boolean;
    value?: string;
    onChange?: (value: string) => void;

  
};

const states = {
  default: "border-topaz-blue-700 focus:border-primary-topaz-blue-500 focus:ring-4 focus:ring-primary-topaz-blue-500/30 focus:outline-none",
  error: "border-error focus:border-error focus:ring-4 focus:ring-error/30 focus:outline-none",
};



function TextField({ label, id, placeholder, type = "text", state = "default", multiline = false, value, onChange }: TextFieldProps) {

    const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";



const shared = `w-full rounded-[14px] border-[1.5px] bg-transparent px-[18px] text-[15px] placeholder:text-gunmetal-grey-400 ${states[state]}`;

    return(
        
<fieldset className="fieldset">

 <label
  className={`text-[15px] font-medium ${state === "error" ? "text-error" : "text-topaz-blue-800"}`}
  htmlFor={id}

>
  {label}
</label>


  {multiline ? (
  <textarea
    id={id}
    rows={5}
    placeholder={placeholder}
    className={`textarea resize-none py-3 ${shared}`}
    value={value}
    onChange={(e) => onChange?.(e.target.value)}

  />
) : (
    <div className="relative">
    <input
      type={isPassword && showPassword ? "text" : type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`input h-[42px] ${isPassword ? "pr-12" : ""} ${shared}`}
    />
    {isPassword && (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center text-topaz-blue-700 hover:text-topaz-blue-800"
      >
        <Icon src={showPassword ? eyeOffIcon : eyeIcon} className="size-5" />
      </button>
    )}
  </div>

  )}

</fieldset>

    );
}

export default TextField;
