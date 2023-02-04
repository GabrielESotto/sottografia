import Header from "../components/Header/Header";
import PhotosRender from "../components/PhotosRender/PhotosRender";

const Gestante: React.FC = () => {
  return (
    <>
      <Header adminPage={false} />
      <PhotosRender typeRender="Gestante" />
    </>
  );
};

export default Gestante;
