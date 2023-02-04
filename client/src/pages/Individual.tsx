import Header from "../components/Header/Header";
import PhotosRender from "../components/PhotosRender/PhotosRender";

const Individual: React.FC = () => {
  return (
    <>
      <Header adminPage={false} />
      <PhotosRender typeRender="Individual" />
    </>
  );
};

export default Individual;
