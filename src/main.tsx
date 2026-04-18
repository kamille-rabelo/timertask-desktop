import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initializeColorTheme } from "./layout/hooks/useColorTheme.ts";
import { initializeDarkMode } from "./layout/hooks/useDarkMode.ts";

initializeColorTheme();
initializeDarkMode();

createRoot(document.getElementById("root")!).render(<App />);
