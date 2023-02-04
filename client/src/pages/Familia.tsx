import React from "react";
import Header from "../components/Header/Header";
import PhotosRender from "../components/PhotosRender/PhotosRender";

const Familia: React.FC = () => {
  return (
    <>
      <Header adminPage={false} />
      <PhotosRender typeRender="Familia" />
    </>
  );
};

export default Familia;
