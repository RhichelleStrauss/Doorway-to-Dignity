type BadgeProps = {

    children: string;
    tone?: "dark" | "light";

};

const tones = {

    dark: "border border-cream/45 bg-cream/15 text-cream",
    light: "bg-topaz-blue-100/85 text-topaz-blue-800",

};

function Badge({ children, tone = "dark"}: BadgeProps) {

    return (
    <span className={`inline-flex h-10 items-center rounded-[14px] px-3.5 text-[15px]/[20px] font-semibold uppercase tracking-[1.2px] ${tones[tone]}`}>
      {children}
    </span>
  );

}

export default Badge;