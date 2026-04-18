import type { ReactNode } from "react";

export interface DialogFooterProps {
  children: ReactNode;
}

export function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div className="mt-6 border-t border-[var(--theme-border-current)] pt-4">
      {children}
    </div>
  );
}
