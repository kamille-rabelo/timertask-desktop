import { Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  COLOR_THEME_NAMES,
  colorThemes,
} from "../../../../../code/utils/themes";
import { useDarkMode } from "../../../../../layout/hooks/useDarkMode";
import { useColorTheme } from "../../../../../layout/hooks/useColorTheme";

export function IndexThemePicker() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { colorTheme, setColorTheme } = useColorTheme();
  const { isDark } = useDarkMode();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center p-2 justify-center rounded-xl border border-[var(--theme-border-current)] bg-[var(--theme-surface-current)] text-[var(--theme-text-current)] transition-colors hover:bg-[var(--theme-border-current)]"
        title="Choose color theme"
      >
        <Palette className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 min-w-[160px] rounded-xl border border-[var(--theme-border-current)] bg-[var(--theme-surface-current)] shadow-lg overflow-hidden">
          {COLOR_THEME_NAMES.map((name) => {
            const theme = colorThemes[name];
            const mode = isDark ? theme.dark : theme.light;
            const isActive = colorTheme === name;

            return (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setColorTheme(name);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--theme-border-current)] ${
                  isActive
                    ? "font-semibold text-[var(--theme-text-current)]"
                    : "text-[var(--theme-subtext-current)]"
                }`}
              >
                <span className="flex gap-1 shrink-0">
                  <span
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ backgroundColor: mode.background }}
                  />
                  <span
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ backgroundColor: mode.accent }}
                  />
                  <span
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ backgroundColor: mode.secondary }}
                  />
                </span>
                <span>{theme.label}</span>
                {isActive && (
                  <span className="ml-auto text-xs opacity-60">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
