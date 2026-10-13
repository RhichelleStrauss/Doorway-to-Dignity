type SelectFieldProps = {
  label: string;
  id: string;
  options: string[];
  placeholder?: string;
  state?: "default" | "error";
};

const states = {
  default: "border-topaz-blue-700 focus:border-primary-topaz-blue-500 focus:ring-4 focus:ring-primary-topaz-blue-500/30 focus:outline-none",

  error: "border-error focus:border-error focus:ring-4 focus:ring-error/30 focus:outline-none",
};



function SelectField({ label, id, options, placeholder, state = "default" }: SelectFieldProps) {


    return(

        <fieldset className="fieldset">
  <label
  className={`text-[15px] font-medium ${state === "error" ? "text-error" : "text-topaz-blue-800"}`}
  htmlFor={id}
>
  {label}
</label>


   <select
     id={id}
     defaultValue=""
     className={`select-dignity flex h-[42px] w-full items-center rounded-[14px] border-[1.5px] bg-topaz-blue-100 px-[18px] text-[15px] text-topaz-blue-800 ${states[state]}`}
   >
 <option value="" disabled>{placeholder}</option>
  {options.map((option) => (
    <option key={option} value={option}>{option}</option>
  ))}
</select>
</fieldset>

    );
}

export default SelectField;
