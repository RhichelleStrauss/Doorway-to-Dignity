import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;      
  className?: string;       
};

function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-[14px] bg-card shadow-[0_12px_40px_rgba(8,74,79,0.18)] ${className}`}>
      {children}
    </div>
  );
}

export default Card;
