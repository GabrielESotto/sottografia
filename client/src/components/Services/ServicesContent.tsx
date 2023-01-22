import "./ServicesContent.css";

const ServicesContent: React.FC = () => {
  return (
    <>
      <div className="services-container">
        <div className="wrapper-services">
          <a className="link-portfolio" href="/individual">
            <div className="service-card">
              <div className="service-info">
                <div className="service-card-content">
                  <h1 className="service-title">Individual</h1>
                </div>
              </div>
            </div>
          </a>
          <a className="link-portfolio" href="/casal">
            <div className="service-card">
              <div className="service-info">
                <div className="service-card-content">
                  <h1 className="service-title">Casal</h1>
                </div>
              </div>
            </div>
          </a>
          <a className="link-portfolio" href="/familia">
            <div className="service-card">
              <div className="service-info">
                <div className="service-card-content">
                  <h1 className="service-title">Familia</h1>
                </div>
              </div>
            </div>
          </a>
          <a className="link-portfolio" href="/gestante">
            <div className="service-card">
              <div className="service-info">
                <div className="service-card-content">
                  <h1 className="service-title">Gestante</h1>
                </div>
              </div>
            </div>
          </a>
          <a className="link-portfolio" href="/eventos">
            <div className="service-card">
              <div className="service-info">
                <div className="service-card-content">
                  <h1 className="service-title">Eventos</h1>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default ServicesContent;
