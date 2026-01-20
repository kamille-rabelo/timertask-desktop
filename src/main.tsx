import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initializeDarkMode } from "./layout/hooks/useDarkMode.ts";

initializeDarkMode();

createRoot(document.getElementById("root")!).render(<App />);
