import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ClientCard from "./components/ClientList/Clientcard/ClientCard.jsx";
import ClientInline from "./components/ClientList/ClientInline/ClientInline.jsx";
import ClientList from "./components/ClientList/ClientList.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
        <ClientCard />
        <ClientInline />
        <p>Client-Liste</p>
        <ClientList />
    </StrictMode>
);
