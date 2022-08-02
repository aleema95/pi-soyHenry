import React from "react";
import Style from './Platform.module.css'
import { useState } from "react";


function Platform(props){
  const { name, addGenreAndPlatform } = props;
  const [isActive, setIsActive] = useState(false);

  function handleClick(e){
    setIsActive(current => !current);
    addGenreAndPlatform(e.target.name, e.target.value);
  }

  return (
    <div className={`${Style.platformContainer}  ${isActive ? Style.selected : null }`}>
      <input onClick={handleClick} type="checkbox" name='platforms' id={name} value={name}/>
      <label  htmlFor={name}>{name}</label>
    </div>
  )
}

export default Platform;