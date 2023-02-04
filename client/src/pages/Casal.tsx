import Header from "../components/Header/Header";
import PhotosRender from "../components/PhotosRender/PhotosRender";

const Casal: React.FC = () => {
  return (
    <>
      <Header adminPage={false} />
      <PhotosRender typeRender="Casal" />
    </>
  );
};

export default Casal;
