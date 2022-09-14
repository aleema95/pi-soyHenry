import React from 'react';
import { Link } from 'react-router-dom';
import Style from './VideogameCard.module.css'
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllVideogames } from '../../redux/actions/actions';


function VideogameCard(props) {
  const {id, name, background_image, Generos, rating } = props;

  return(
    <Link className={Style.link} to={`/videogamedetail/${id}`}>
      <div className={Style.container}>
        <img src={background_image} alt="background"/>
        <span>{name}</span>
        <span>{rating}</span>
          <div className={Style.divisoryLine}></div>
        <div className={Style.genresContainer}>
          {Generos?.map( g => <h3 key={g.id}>{g.name}</h3>)}
        </div>
      
      </div>
    </Link>
  )
}

export default VideogameCard;