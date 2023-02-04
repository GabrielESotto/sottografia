import React from "react";
import ContactContent from "../components/Contact/ContactContent";
import Header from "../components/Header/Header";

const Contact: React.FC = () => {
  return (
    <>
      <Header adminPage={false} />
      <ContactContent />
    </>
  );
};

export default Contact;
