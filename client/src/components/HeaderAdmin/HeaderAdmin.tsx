import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
import "./HeaderAdmin.css";
import BasicMenu from "../MenuMobile/MenuMobile";

const LoggedAdmin: React.FC = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div className="admin-header">
        <div className="container-admin">
          <div className="mini-logo">
            <h1 className="title-logo">Bem vindo Isabela</h1>
          </div>

          <ul className="admin-ul">
            <li className="admin-li">
              <a target="_blank" href="/">
                Visit my page
              </a>
            </li>
            <li className="admin-li">
              <a href="/logged/admin/agenda">Agenda</a>
            </li>
            <li className="admin-li">
              <a href="/logged/admin/photos">Fotos</a>
            </li>
            <li className="admin-li">
              <a onClick={logout} href="/adminpage">
                Sair
              </a>
            </li>
            <li className="admin-li mobile">
              <BasicMenu />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LoggedAdmin;
