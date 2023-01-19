import './Sidebar.css'

type IProps = {
  closeSide: () => void;
  isOpen: boolean;
}

const Sidebar = ({closeSide}: IProps) => {
  return (
    <>
      <div className="content">
        <div className="side-container">
          <div className="side-wrapper">
            <div className="close-sidebar">
              <h1 onClick={closeSide} className='close'>X</h1>
            </div>
            <nav>
              <ul className='mobile-ul'>
                <li className='mobile-li'><a href="/">Home</a></li>
                <li className='mobile-li'><a href="/about">Sobre mim</a></li>
                <li className='mobile-li'><a href="/services">Serviços</a></li>
                <li className='mobile-li'><a href="#">Contato</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
