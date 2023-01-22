import "./AboutContent.css";

const AboutContent: React.FC = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-content">
          <div className="wrapper">
            <div className="wrapper-left">
              <div className="shadow-img">
                <div className="image-person" />
              </div>
            </div>

            <div className="wrapper-right">
              <h1>Sobre a fotógrafa:</h1>
              <p>
                Me chamo Isabela, tenho 24 anos, sou apaixonada pela fotografia
                desde a infância. Sou casada a 2 anos, tenho 2 filhas de 4
                patas. Adoro toda forma de arte, e por isso amo a arte de
                fotografar. Registro muitas vidas com amor e carinho! Atuo em
                diversos segmentos, ou seja, eventos e ensaios: familia,
                individual, gestante, casal, etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
