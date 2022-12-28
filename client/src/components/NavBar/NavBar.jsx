import { Link } from "react-router-dom";

import bornozFlyLogo from "/assets/bornozFlyLogo.png"

const NavBar = () => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl normal-case">
            <img src={bornozFlyLogo} className="w-12" />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <Link className="mr-5" to="/category/general">Vuelos</Link>
            <Link className="mr-5" to="/category/platea">Alojamientos</Link>
            <Link className="mr-5" to="/category/vip">Ayuda</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
