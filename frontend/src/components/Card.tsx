import type { ReactNode } from "react";

const variants = {
  default: "bg-card shadow-[0_12px_40px_rgba(8,74,79,0.18)]",
  solid: "bg-kinda-white",
};

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
};

function Card({ children, className = "", variant = "default" }: CardProps) {
  return (
    <div className={`rounded-[14px] ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

export default Card;
