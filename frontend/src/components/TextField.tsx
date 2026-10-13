

type TextFieldProps = {
    label: string;
    id: string;
    placeholder?: string;
    type?: "text" | "email" | "password" | "tel";
    state?: "default" | "error";
    multiline?: boolean;
  
};

const states = {
  default: "border-topaz-blue-700 focus:border-primary-topaz-blue-500 focus:ring-4 focus:ring-primary-topaz-blue-500/30 focus:outline-none",
  error: "border-error focus:border-error focus:ring-4 focus:ring-error/30 focus:outline-none",
};



function TextField({ label, id, placeholder, type = "text", state = "default", multiline = false }: TextFieldProps) {


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
  />
) : (
  <input
    type={type}
    id={id}
    placeholder={placeholder}
    className={`input h-[42px] ${shared}`}
  />
)}


</fieldset>

    );
}

export default TextField;
