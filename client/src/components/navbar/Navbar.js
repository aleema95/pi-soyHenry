import React from "react";
import { Link } from "react-router-dom";
import Style from './Navbar.module.css';


function Navbar (props) {

  return(
    <div className={Style.container}>
      <ul>
        <Link className={Style.link} to={"/home"}>
          <li>Home</li>
        </Link>
        <Link className={Style.link} to={"/createVideogame"}>
          <li>Create Videogame</li>
        </Link>
      </ul>
    </div>
  )
}

export default Navbar;