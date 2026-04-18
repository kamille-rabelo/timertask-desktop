export type ColorThemeName =
  | "default"
  | "catppuccin"
  | "kanagawa"
  | "gruvbox"
  | "tokyo_night"
  | "nord"
  | "rose_pine"
  | "dracula";

export type ThemeColors = {
  background: string;
  surface: string;
  border: string;
  text: string;
  subtext: string;
  accent: string;
  secondary: string;
};

export type ThemeDefinition = {
  label: string;
  dark: ThemeColors;
  light: ThemeColors;
};

export const COLOR_THEME_NAMES: ColorThemeName[] = [
  "default",
  "catppuccin",
  "kanagawa",
  "gruvbox",
  "tokyo_night",
  "nord",
  "rose_pine",
  "dracula",
];

export const colorThemes: Record<ColorThemeName, ThemeDefinition> = {
  default: {
    label: "Default",
    dark: {
      background: "#111827",
      surface: "#1f2937",
      border: "#2d3748",
      text: "#f9fafb",
      subtext: "#9ca3af",
      accent: "#10b981",
      secondary: "#2c8dff",
    },
    light: {
      background: "#ffffff",
      surface: "#f3f4f6",
      border: "#bec5d1",
      text: "#374151",
      subtext: "#6b7280",
      accent: "#059669",
      secondary: "#1a75e0",
    },
  },
  catppuccin: {
    label: "Catppuccin",
    dark: {
      background: "#1e1e2e",
      surface: "#313244",
      border: "#45475a",
      text: "#cdd6f4",
      subtext: "#a6adc8",
      accent: "#cba6f7",
      secondary: "#f5e0dc",
    },
    light: {
      background: "#eff1f5",
      surface: "#e6e9ef",
      border: "#ccd0da",
      text: "#4c4f69",
      subtext: "#6c6f85",
      accent: "#8839ef",
      secondary: "#dc8a78",
    },
  },
  kanagawa: {
    label: "Kanagawa",
    dark: {
      background: "#1f1f28",
      surface: "#2a2a37",
      border: "#363646",
      text: "#dcd7ba",
      subtext: "#a6a69c",
      accent: "#7e9cd8",
      secondary: "#957fb8",
    },
    light: {
      background: "#f2ecbc",
      surface: "#e8e2b2",
      border: "#dcd7ba",
      text: "#54546d",
      subtext: "#717c7c",
      accent: "#4d699b",
      secondary: "#957fb8",
    },
  },
  gruvbox: {
    label: "Gruvbox",
    dark: {
      background: "#282828",
      surface: "#3c3836",
      border: "#504945",
      text: "#ebdbb2",
      subtext: "#a89984",
      accent: "#fe8019",
      secondary: "#d65d0e",
    },
    light: {
      background: "#fbf1c7",
      surface: "#ebdbb2",
      border: "#d5c4a1",
      text: "#3c3836",
      subtext: "#7c6f64",
      accent: "#af3a03",
      secondary: "#d65d0e",
    },
  },
  tokyo_night: {
    label: "Tokyo Night",
    dark: {
      background: "#1a1b26",
      surface: "#24283b",
      border: "#414868",
      text: "#c0caf5",
      subtext: "#a9b1d6",
      accent: "#7aa2f7",
      secondary: "#bb9af7",
    },
    light: {
      background: "#e1e2e7",
      surface: "#d4d6e4",
      border: "#c4c8da",
      text: "#3760bf",
      subtext: "#6172b0",
      accent: "#2e7de9",
      secondary: "#9854f1",
    },
  },
  nord: {
    label: "Nord",
    dark: {
      background: "#2e3440",
      surface: "#3b4252",
      border: "#4c566a",
      text: "#d8dee9",
      subtext: "#949fb1",
      accent: "#88c0d0",
      secondary: "#81a1c1",
    },
    light: {
      background: "#eceff4",
      surface: "#e5e9f0",
      border: "#d8dee9",
      text: "#2e3440",
      subtext: "#4c566a",
      accent: "#5e81ac",
      secondary: "#81a1c1",
    },
  },
  rose_pine: {
    label: "Rosé Pine",
    dark: {
      background: "#191724",
      surface: "#1f1d2e",
      border: "#26233a",
      text: "#e0def4",
      subtext: "#908caa",
      accent: "#ebbcba",
      secondary: "#c4a7e7",
    },
    light: {
      background: "#faf4ed",
      surface: "#fffaf3",
      border: "#f2e9e1",
      text: "#575279",
      subtext: "#797593",
      accent: "#d7827e",
      secondary: "#907aa9",
    },
  },
  dracula: {
    label: "Dracula",
    dark: {
      background: "#282a36",
      surface: "#44475a",
      border: "#6272a4",
      text: "#f8f8f2",
      subtext: "#bfbfbf",
      accent: "#bd93f9",
      secondary: "#ff79c6",
    },
    light: {
      background: "#f8f8f2",
      surface: "#e6e6e6",
      border: "#bd93f9",
      text: "#282a36",
      subtext: "#6272a4",
      accent: "#bd93f9",
      secondary: "#ff79c6",
    },
  },
};
