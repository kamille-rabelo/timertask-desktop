import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        "w-full h-[48px] px-4 py-2 rounded-[12px] border border-[var(--theme-border-current)] bg-[var(--theme-surface-current)] text-[var(--theme-text-current)] placeholder:text-[var(--theme-subtext-current)] text-[12px] leading-[1.5] outline-none focus:border-[var(--theme-accent-current)] focus:ring-1 focus:ring-[var(--theme-accent-current)] transition-all",
        className,
      )}
      {...props}
    />
  );
}
