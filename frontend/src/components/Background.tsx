import type { ReactNode } from "react";
import arc1 from "../assets/figma/hero-arc-1.svg"
import arc2 from "../assets/figma/hero-arc-2.svg"
import arc3 from "../assets/figma/hero-arc-3.svg"
import arc4 from "../assets/figma/hero-arc-4.svg"
import sectionArcs from "../assets/figma/section-arcs-a.svg"

type BackgroundProps = {
    children: ReactNode;
    tone?: "dark" | "light";  
    image?: string;           
    className?: string;       
};

function Background ({ children, tone = "dark", image, className = "" }: BackgroundProps) {

    const base = tone === "dark" ? "bg-topaz-blue-800" : "bg-soft-amber-100";

    return(
        <div className={`relative overflow-hidden ${base} ${className}`}>

            {tone === "dark" ? (
                <>
                    {image && (
                        <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-r from-topaz-blue-800/95 via-topaz-blue-800/80 to-topaz-blue-700/45" />

                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 origin-top-left scale-[0.78]">
                        <div className="absolute flex items-center justify-center left-[-463px] h-[1770px] w-[1775px]" style={{ top: 94 }}>
                            <div className="flex-none rotate-[137.44deg]">
                                <img src={arc1} alt="" className="block max-w-none h-[1213px] w-[1296px]" />
                            </div>
                        </div>

                        <div className="absolute flex items-center justify-center left-[-338px] h-[1475px] w-[1450px]" style={{ top: 382 }}>
                            <div className="flex-none -rotate-[59.77deg]">
                                <img src={arc2} alt="" className="block max-w-none h-[1034px] w-[1105px]" />
                            </div>
                        </div>

                        <div className="absolute flex items-center justify-center left-[847px] h-[1636px] w-[1660px]" style={{ top: -354 }}>
                            <div className="flex-none rotate-[32.66deg]">
                                <img src={arc3} alt="" className="block max-w-none h-[1154px] w-[1232px]" />
                            </div>
                        </div>

                        <div className="absolute flex items-center justify-center left-[1179px] h-[1061px] w-[998px]" style={{ top: -196.67 }}>
                            <div className="flex-none -rotate-[92.29deg]">
                                <img src={arc4} alt="" className="block max-w-none h-[958px] w-[1024px]" />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
               
                <img
                    src={sectionArcs}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-23.57%] h-auto w-[max(144.66%,1100px)] max-w-none"
                    style={{ top: "-1.5vw" }}
                />
            )}

            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
}

export default Background;
