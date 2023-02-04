import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import "./LoggedAdmin.css";

const LoggedAdmin: React.FC = () => {
  return (
    <>
      <HeaderAdmin />
      <div className="bg-loggedpage">
        <div className="welcome-img" />
      </div>
    </>
  );
};

export default LoggedAdmin;
