import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../../../../layout/hooks/useDarkMode";

export function IndexDarkModeToggle() {
  const darkMode = useDarkMode();

  return (
    <button
      type="button"
      onClick={darkMode.toggleTheme}
      className="flex items-center p-2 justify-center rounded-xl border border-Black-100 bg-White text-Black-500 transition-colors hover:bg-Black-100 dark:border-Black-600 dark:bg-Black-700 dark:text-White dark:hover:bg-Black-600"
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
