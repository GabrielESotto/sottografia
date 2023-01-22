import "./HeaderAdmin.css";

const LoggedAdmin: React.FC = () => {
  return (
    <>
      <div className="admin-header">
        <div className="container-admin">
          <div className="mini-logo">
            <h1 className="title-logo">Bem vindo Isabela</h1>
          </div>
          <ul className="admin-ul">
            <li className="admin-li">
              <a href="/logged/admin/agenda">Agenda</a>
            </li>
            <li className="admin-li">
              <a href="#">Entregas</a>
            </li>
            <li className="admin-li">
              <a href="#">Fotos</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LoggedAdmin;
