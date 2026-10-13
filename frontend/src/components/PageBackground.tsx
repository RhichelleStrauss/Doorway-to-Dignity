import type { ReactNode } from "react";
import arcsA from "../assets/figma/section-arcs-a.svg"
import arcsB from "../assets/figma/section-arcs-b.svg"

const arcs = [
  { src: arcsA, top: "0%" },
  { src: arcsB, top: "30%" },
  { src: arcsA, top: "70%" },
];

type PageBackgroundProps = {
  children: ReactNode;
};

function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="relative overflow-hidden bg-soft-amber-100">
      {arcs.map(({ src, top }) => (
        <img
          key={top}
          src={src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[-23.57%] h-auto w-[max(144.66%,1100px)] max-w-none"
          style={{ top: `calc(${top} - 1.5vw)` }}
        />
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default PageBackground;
