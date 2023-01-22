import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginProvider } from "./contexts/LoginContext";
import { GetAgendaProvider } from "./contexts/GetAgendaContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <LoginProvider>
        <GetAgendaProvider>
          <App />
        </GetAgendaProvider>
      </LoginProvider>
    </AuthProvider>
  </BrowserRouter>
);
