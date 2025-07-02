import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {AuthProvider} from "./context/AuthContext";
import {AccountsProvider} from "./context/AccountsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <AccountsProvider>
        <App />
      </AccountsProvider>
    </AuthProvider>
  </React.StrictMode>
);
