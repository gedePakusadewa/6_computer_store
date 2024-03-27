import { Link } from "react-router-dom";
import { AuthContext } from "../App.js";
import { useContext } from "react";
import { useCookies } from 'react-cookie';
import GeneralConst from "../resources/General.js"
import "../style.css";

function Navbar({activeNavBar}) {
  const context = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(['user']);

  return(
    <div className="container-navbar">
      <nav>
        <div>
          <Link to="/">
            <button  
              className={activeNavBar === GeneralConst.DASHBOARD ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {GeneralConst.DASHBOARD}
            </button>
          </Link>
        </div>
        <div>
          <Link to="/cart">
            <button 
              className={activeNavBar === GeneralConst.CART ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {GeneralConst.CART}
            </button>
          </Link>
        </div>
        <div>
          <Link to="/profile">
            <button 
              className={activeNavBar === GeneralConst.PROFILE ? "btn-cust btn-active-navbar" : "btn-cust btn-non-active-navbar"}
            >
              {GeneralConst.PROFILE}
            </button>
          </Link>
        </div>
        {cookies['token'] !== undefined && (
          <div>
            <button
              className="btn-cust btn-non-active-navbar"
              onClick={()=>context.handleLogout(cookies['token'])}
            >
              {GeneralConst.LOGOUT}
            </button>
          </div>
        )}
      </nav>
    </div>
  )
};

export default Navbar;