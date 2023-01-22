import Header from "../../../components/Header/Header";
import Form from "../../../components/LoginForm/Form";

const Admin: React.FC = () => {
  return (
    <>
      <Header adminPage={true} />
      <Form />
    </>
  );
};

export default Admin;
