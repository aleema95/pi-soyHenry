import React, { useState } from "react";
import Style from './Genre.module.css';

function Genre(props){
  const { id, name, addGenreAndPlatform } = props;

  const [isActive, setIsActive] = useState(false);

  function handleClick(e){
    setIsActive(current => !current);
    addGenreAndPlatform(e.target.name ,e.target.value)
  }

  return (
    <div className={`${Style.genreContainer} ${isActive ? Style.selected : null }`}>
      <input onClick={handleClick} type="checkbox" name='genres' id={name} value={id}/>
      <label htmlFor={name}>{name}</label>
    </div>
  )

}

export default Genre;