import React from "react";
import AboutContent from "../components/About/AboutContent";
import Header from "../components/Header/Header";

const About: React.FC = () => {
  return (
    <>
      <Header adminPage={false} />
      <AboutContent />
    </>
  );
};

export default About;
