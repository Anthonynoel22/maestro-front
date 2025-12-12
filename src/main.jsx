import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
/* import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css"; */
import "./index.scss";
import ToastProvider from "./components/Toast/Toast.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ToastProvider />
        <App />
    </StrictMode>
);
