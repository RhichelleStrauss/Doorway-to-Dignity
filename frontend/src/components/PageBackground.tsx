import type { ReactNode } from "react";
import arcsA from "../assets/figma/section-arcs-a.svg"
import arcsB from "../assets/figma/section-arcs-b.svg"

// each arc's top is a multiple of the arc image's own width (max(144.66vw, 1100px)),
// so the spacing stays the same on short pages instead of squashing together.
// arcs that land below a short page are just clipped by overflow-hidden
const arcs = [
  { src: arcsA, offset: 0 },
  { src: arcsB, offset: 0.539 },
  { src: arcsA, offset: 1.248 },
];

type PageBackgroundProps = {
  children: ReactNode;
};

function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="relative overflow-hidden bg-soft-amber-100">
      {arcs.map(({ src, offset }) => (
        <img
          key={offset}
          src={src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[-23.57%] h-auto w-[max(144.66%,1100px)] max-w-none"
          style={{ top: `calc(max(144.66vw, 1100px) * ${offset} - 1.5vw)` }}
        />
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default PageBackground;
