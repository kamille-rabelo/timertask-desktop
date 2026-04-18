import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface SelectTriggerProps {
  className?: string;
  children: ReactNode;
}

export function SelectTrigger(props: SelectTriggerProps) {
  return (
    <RadixSelect.Trigger
      className={twMerge(
        "w-full h-[48px] px-4 py-2 rounded-[12px] border border-[var(--theme-border-current)] bg-[var(--theme-surface-current)] text-[var(--theme-text-current)] text-[12px] leading-normal outline-none transition-all flex items-center justify-between gap-2 data-placeholder:text-[var(--theme-subtext-current)] data-disabled:cursor-not-allowed data-disabled:opacity-50",
        props.className,
      )}
    >
      {props.children}
      <RadixSelect.Icon>
        <ChevronDown className="h-4 w-4 text-[var(--theme-subtext-current)]" />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
}
