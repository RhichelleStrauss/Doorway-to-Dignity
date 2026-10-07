//typescript101 with rhi ＼（〇_ｏ）／
//props: inputs given to component --- buttton variant="outline"> leanrmore </button> variant "outline" is one prop
//variant is attribtue, known as prop, learn more is between tags so its content 
//children:string content should be plaiin text, if image is inserted react no likey because not string
//type, prop name: what type 
//

import { Link } from "react-router-dom";


type ButtonProps = {
  children: string;
  variant?: "primary" | "outline" | "danger";
  type?: "button" | "submit" | "reset";
};

const variants = {
    primary: "bg-primary-topaz-blue-500 text-topaz-blue-800 hover:bg-topaz-blue-300",
    outline: "border border-cream text-cream hover:bg-cream/15",
    danger: "bg-error text-white hover:bg-error/90",
}

function Button({ children, variant = "primary", type = "button" }: ButtonProps) {
  return (
     <button
     type={type}
      className={`inline-flex h-[42px] items-center justify-center rounded-[14px] px-8 text-[15px] font-semibold transition-colors ${variants[variant]}`}
    >
      {children} 
      {/* children text in button, spot where text goes */}
    </button>
  );
}

export default Button;
