import Icon from "./Icon";
import alertIcon from "../assets/icons/alert-circle.svg";

type DisclaimerProps = {
  children: string;
};

function Disclaimer({ children }: DisclaimerProps) {
  return (
    <div role="note" className="flex items-center justify-center gap-4 bg-error-frame px-6 py-3 text-cream">
      <Icon src={alertIcon} className="size-7 shrink-0 lg:size-9" />
      <p className="text-[16px]/[22px] font-bold lg:text-[24px]/[30px]">{children}</p>
    </div>
  );
}

export default Disclaimer;
