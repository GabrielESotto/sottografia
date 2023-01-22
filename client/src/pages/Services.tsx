import Header from "../components/Header/Header";
import ServicesContent from "../components/Services/ServicesContent";

const Services: React.FC = () => {
  return (
    <>
      <Header adminPage={false} />
      <ServicesContent />
    </>
  );
};

export default Services;
