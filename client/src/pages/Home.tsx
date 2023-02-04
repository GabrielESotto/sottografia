import Header from "../components/Header/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header adminPage={false} />
      <div className="home">
        <div className="box-shadow-title">
          <h1>Vamos registrar momentos juntos?</h1>
        </div>
        <a href="/contact">
          <button>Contato</button>
        </a>
      </div>
    </>
  );
};

export default Home;
