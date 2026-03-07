import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css' //  cargar Tailwind
import App from "./App";
import { BrowserRouter } from "react-router"; // Importar BrowserRouter para manejar rutas


createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
