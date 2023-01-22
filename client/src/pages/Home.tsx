import Header from "../components/Header/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header adminPage={false} />
      <div className="home"></div>
    </>
  );
};

export default Home;
