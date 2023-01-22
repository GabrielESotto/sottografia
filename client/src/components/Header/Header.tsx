import "./Header.css";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar/Sidebar";

interface IProps {
  adminPage: boolean;
}

const Header: React.FC<IProps> = ({ adminPage }: IProps) => {
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);

  const handleOpenSide: () => void = () => {
    setIsSideOpen((prev) => !prev);
  };

  return (
    <>
      <header>
        <div className="container">
          <nav className="navbar">
            <a className="logo">Isabela Sotto • Fotografia</a>
            {!adminPage && (
              <ul className="navbar-ul">
                <li className="navbar-li">
                  <a href="/">Home</a>
                </li>
                <li className="navbar-li">
                  <a href="/about">Sobre mim</a>
                </li>
                <li className="navbar-li">
                  <a href="/services">Serviços</a>
                </li>
                <li className="navbar-li">
                  <a href="#">Contato</a>
                </li>
              </ul>
            )}
            {!adminPage && (
              <div className={`navmobile ${isSideOpen ? "open" : ""}`}>
                <MenuIcon onClick={handleOpenSide} className="btn-menu" />
              </div>
            )}
          </nav>
        </div>
      </header>
      {isSideOpen && <Sidebar closeSide={handleOpenSide} isOpen={isSideOpen} />}
    </>
  );
};

export default Header;
