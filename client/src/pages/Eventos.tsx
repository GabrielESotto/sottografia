import Header from "../components/Header/Header";
import PhotosRender from "../components/PhotosRender/PhotosRender";

const Eventos: React.FC = () => {
  return (
    <>
      <Header adminPage={false} />
      <PhotosRender typeRender="Eventos" />
    </>
  );
};

export default Eventos;
