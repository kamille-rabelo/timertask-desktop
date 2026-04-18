import { create } from "zustand";
import {
  COLOR_THEME_NAMES,
  colorThemes,
  type ColorThemeName,
} from "../../code/utils/themes";

export type { ColorThemeName };

function getStoredColorTheme(): ColorThemeName {
  if (typeof window === "undefined") return "default";
  const stored = localStorage.getItem("color-theme");
  if (stored && COLOR_THEME_NAMES.includes(stored as ColorThemeName)) {
    return stored as ColorThemeName;
  }
  return "default";
}

export function applyColorTheme(colorTheme: ColorThemeName) {
  const theme = colorThemes[colorTheme];
  const root = document.documentElement;
  root.style.setProperty("--theme-bg-light", theme.light.background);
  root.style.setProperty("--theme-surface-light", theme.light.surface);
  root.style.setProperty("--theme-border-light", theme.light.border);
  root.style.setProperty("--theme-text-light", theme.light.text);
  root.style.setProperty("--theme-subtext-light", theme.light.subtext);
  root.style.setProperty("--theme-accent-light", theme.light.accent);
  root.style.setProperty("--theme-secondary-light", theme.light.secondary);
  root.style.setProperty("--theme-bg-dark", theme.dark.background);
  root.style.setProperty("--theme-surface-dark", theme.dark.surface);
  root.style.setProperty("--theme-border-dark", theme.dark.border);
  root.style.setProperty("--theme-text-dark", theme.dark.text);
  root.style.setProperty("--theme-subtext-dark", theme.dark.subtext);
  root.style.setProperty("--theme-accent-dark", theme.dark.accent);
  root.style.setProperty("--theme-secondary-dark", theme.dark.secondary);
}

export function initializeColorTheme() {
  applyColorTheme(getStoredColorTheme());
}

type ColorThemeStore = {
  colorTheme: ColorThemeName;
  setColorTheme: (theme: ColorThemeName) => void;
};

export const useColorTheme = create<ColorThemeStore>((set) => ({
  colorTheme: getStoredColorTheme(),
  setColorTheme: (theme: ColorThemeName) => {
    localStorage.setItem("color-theme", theme);
    applyColorTheme(theme);
    set({ colorTheme: theme });
  },
}));
