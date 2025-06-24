import { useContext } from "react"
import UserContext from "./js/UserContext"

function Navbar() {

  const context = useContext(UserContext);
    
    return (
        <>
        <nav className="navbar navbar-expand-lg" id="navbar">
          <div className="container-fluid px-5">
            <a className="navbar-brand mx-5" href="#">
              <img src="../resources/NEVA_Logo.png" className="logo-dashboard" alt="logo" />
            </a>
        
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="nav-menu collapse navbar-collapse justify-content-end mx-5" id="navbarText">
              <ul className="navbar-nav mb-2 mb-lg-0 nav-list">
                <li className="nav-item mx-3">
                  <a href="" className='text-decoration-none menu-item' onClick={context.logOut}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </>
    )
}

export default Navbar