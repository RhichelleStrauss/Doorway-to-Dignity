import Icon from "./Icon";
import alertIcon from "../assets/icons/alert-circle.svg";

type DisclaimerProps = {
  children: string;
};

function Disclaimer({ children }: DisclaimerProps) {
  
  return (
  <div role="note" className="overflow-hidden bg-[#F15152] px-6 py-3 text-cream">
    <div className="flex animate-roll items-center justify-center gap-3 motion-reduce:animate-none">
      <Icon src={alertIcon} className="size-6 shrink-0 lg:size-7" />
      <p className="text-[15px]/[22px] lg:text-[18px]/[26px]">{children}</p>
    </div>
  </div>
);

}

export default Disclaimer;
