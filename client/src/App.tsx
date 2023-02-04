import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthContext from "./contexts/AuthContext";
import About from "./pages/About";
import Agenda from "./pages/Admin/Agenda/Agenda";
import Delivery from "./pages/Admin/Entregas/Delivery";
import LoggedAdmin from "./pages/Admin/LoggedPage/LoggedAdmin";
import Admin from "./pages/Admin/Login Page/Admin";
import Photos from "./pages/Admin/Photos/Photos";
import Casal from "./pages/Casal";
import Contact from "./pages/Contact";
import Eventos from "./pages/Eventos";
import Familia from "./pages/Familia";
import Gestante from "./pages/Gestante";
import Home from "./pages/Home";
import Individual from "./pages/Individual";
import Services from "./pages/Services";

const App: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/individual" element={<Individual />} />
      <Route path="/casal" element={<Casal />} />
      <Route path="/familia" element={<Familia />} />
      <Route path="/gestante" element={<Gestante />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/adminpage" element={<Admin />} />
      <Route
        path="/logged/admin"
        element={user ? <LoggedAdmin /> : <Admin />}
      />
      <Route
        path="/logged/admin/agenda"
        element={user ? <Agenda /> : <Admin />}
      />
      <Route
        path="/logged/admin/delivery"
        element={user ? <Delivery /> : <Admin />}
      />
      <Route
        path="/logged/admin/photos"
        element={user ? <Photos /> : <Admin />}
      />
    </Routes>
  );
};

export default App;
