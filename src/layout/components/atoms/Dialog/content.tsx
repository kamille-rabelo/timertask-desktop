import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface DialogContentProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function DialogContent({
  title,
  description,
  children,
  className,
}: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-Black-700/60 dark:bg-Black-900/80 z-50" />
      <RadixDialog.Content
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
        className={twMerge(
          "fixed left-1/2 top-1/2 w-[420px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-White p-6 shadow-[0px_20px_50px_rgba(0,0,0,0.25)] dark:bg-Black-800 z-50",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <RadixDialog.Title className="text-lg font-semibold text-Black-700 dark:text-White">
              {title}
            </RadixDialog.Title>
            {description ? (
              <RadixDialog.Description className="text-sm text-Black-300 dark:text-Black-400">
                {description}
              </RadixDialog.Description>
            ) : null}
          </div>
          <RadixDialog.Close asChild>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-Black-300 transition-colors hover:bg-Black-100 dark:text-Black-400 dark:hover:bg-Black-600"
            >
              <X size={16} />
            </button>
          </RadixDialog.Close>
        </div>
        <div className="mt-6">{children}</div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}
