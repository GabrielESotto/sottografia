import { Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Agenda from "./pages/Admin/Agenda/Agenda";
import Delivery from "./pages/Admin/Entregas/Delivery";
import LoggedAdmin from "./pages/Admin/LoggedPage/LoggedAdmin";
import Admin from "./pages/Admin/Login Page/Admin";
import Home from "./pages/Home";
import Individual from "./pages/Individual";
import Services from "./pages/Services";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/individual" element={<Individual />} />
      <Route path="/adminpage" element={<Admin />} />
      <Route path="/logged/admin" element={<LoggedAdmin />} />
      <Route path="/logged/admin/agenda" element={<Agenda />} />
      <Route path="/logged/admin/delivery" element={<Delivery />} />
    </Routes>
  );
};

export default App;
