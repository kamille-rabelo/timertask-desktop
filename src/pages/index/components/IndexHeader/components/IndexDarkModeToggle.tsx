import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../../../../layout/hooks/useDarkMode";

export function IndexDarkModeToggle() {
  const darkMode = useDarkMode();

  return (
    <button
      type="button"
      onClick={darkMode.toggleTheme}
      className="flex items-center p-2 justify-center rounded-xl border border-[var(--theme-border-current)] bg-[var(--theme-surface-current)] text-[var(--theme-text-current)] transition-colors hover:bg-[var(--theme-border-current)]"
      title={darkMode.isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode.isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
