import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DESTROY_DETAILS } from "../../redux/actions/actions";
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameById, deleteVideogame, RESET_DELETE_VIDEOGAME_STATUS } from "../../redux/actions/actions";
import  background_img from '../../img/videogame.png';
import Style from './VideogameDetail.module.css';

function VideogameDetail(props){
  let { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const details = useSelector(state => state.mainReducer.videogameDetails);
  const deleteVideogameStatus = useSelector(state => state.mainReducer.deleteVideogameStatus);
  const { name, background_image, Genres, genres,  platforms, rating,description_raw, released } = details;

  function handleClick(e){
    dispatch(deleteVideogame(id)); 
  }

  useEffect(() => {
    if (deleteVideogameStatus === 'success') {
      alert('Videojuego eliminado correctamente')
      dispatch({type: RESET_DELETE_VIDEOGAME_STATUS})
      navigate('/home');
    } else if (deleteVideogameStatus === 'error') {
      alert('Error al eliminar el videojuegos')
      dispatch({type: RESET_DELETE_VIDEOGAME_STATUS})
    }
  }, [deleteVideogameStatus, navigate, dispatch])

  useEffect(() => {
    dispatch(getVideogameById(id))
      return function destroyDetails() {
        dispatch({type: DESTROY_DETAILS, payload: {}})
      }
  },[dispatch, id])

  return(

      <div className={Style.mainContainer}>
          {Genres?
          //Por DB
          <div className={Style.apiMainContainer}>
            <div>
              <img src={background_img} alt="background"/>
            </div>
            <div className={Style.gameDesc}>
              <button onClick={handleClick}>Delete</button>
              <h1>{name}</h1>
              {/* <p>{description}</p> */}
              <div className={Style.divisoryLineBigger}></div>
              <h2>Rating:  {rating}</h2>
              <div className={Style.genresAndPlatformContainer}></div>
              <div className={Style.genresContainer}>
                <h2>Genres </h2>
                <div className={Style.divisoryLine}></div>
                  {Genres?.map( genre => {
                    return (
                      <h3 key={genre.id}>{genre.name}</h3>
                    )})}
              </div>
              <div>
                <h2>Platforms </h2>
                <div className={Style.divisoryLine}></div>
                {platforms?.map( platform => {
                  return (
                    <h3 key={platform.id}>{platform}</h3>
                  )})}
              </div>
              {/* <h3>{release_date}</h3> */}
            </div>
          </div> :
          //Por Api
          <div className={Style.apiMainContainer}>
            <div>
              <img src={background_image} alt="background" />
            </div>
            <div className={Style.gameDesc}>
              <h1>{name}</h1>
              <p>{description_raw}</p>
              <div className={Style.divisoryLineBigger}></div>
              <h2>Rating:  {rating}</h2>
              <h3>Released: {released}</h3>
              <div className={Style.genresAndPlatformContainer}>
                <div>
                  {/* GENEROS POR API*/}
                  <h2>Genres </h2>
                  <div className={Style.divisoryLine}></div>
                  {genres?.map(genre =>{
                    return(
                      <h3 key={genre.id}>{genre.name}</h3>
                    )
                  })}
                </div>
                <div>
                  <h2>Platforms </h2>
                  <div className={Style.divisoryLine}></div>
                  {platforms?.map( platform => {
                    return (
                      <h3 key={platform.id}>{platform.platform.name}</h3>
                    )})}
                </div>
              </div>
            </div>
          </div> 
        }
      </div>
  )
}

export default VideogameDetail;