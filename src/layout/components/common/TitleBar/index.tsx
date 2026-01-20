import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, Square, X } from "lucide-react";

const baseButtonClasses =
  "group inline-flex h-6 w-6 items-center justify-center rounded-md border border-Black-100/60 text-Black-700 transition-colors hover:bg-Black-100/70 dark:border-Black-700 dark:text-White dark:hover:bg-Black-800";

export async function TitleBar() {
  return (
    <header
      className="flex h-10 w-full items-center justify-end gap-2 border-b border-Black-100 bg-White/90 px-3 backdrop-blur dark:border-Black-700 dark:bg-Black-900/80"
      data-tauri-drag-region
    >
      <button
        type="button"
        className={baseButtonClasses}
        onClick={async () => await getCurrentWindow().minimize()}
        aria-label="Minimizar"
        data-tauri-drag-region="false"
      >
        <Minus className="h-3 w-3" />
      </button>
      <button
        type="button"
        className={baseButtonClasses}
        onClick={async () => await getCurrentWindow().toggleMaximize()}
        aria-label="Maximizar"
        data-tauri-drag-region="false"
      >
        <Square className="h-3 w-3" />
      </button>
      <button
        type="button"
        className={`${baseButtonClasses} hover:bg-Red-100/80 hover:text-Red-500 dark:hover:bg-Red-500/20`}
        onClick={async () => await getCurrentWindow().close()}
        aria-label="Fechar"
        data-tauri-drag-region="false"
      >
        <X className="h-3 w-3" />
      </button>
    </header>
  );
}
