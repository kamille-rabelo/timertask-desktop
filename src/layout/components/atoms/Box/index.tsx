import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Box({ children, className, ...props }: BoxProps) {
  return (
    <div
      className={twMerge(
        "bg-[var(--theme-surface-current)] rounded-[24px] shadow-[0px_12px_40px_rgba(0,0,0,0.25)] border border-[var(--theme-border-current)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
