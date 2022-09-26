import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DESTROY_DETAILS } from "../../redux/actions/actions";
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameById, deleteVideogame, RESET_DELETE_VIDEOGAME_STATUS } from "../../redux/actions/actions";
import  background_img from '../../img/videogame.png';
import Style from './VideogameDetail.module.css';

function VideogameDetail(props){
  let { code } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const details = useSelector(state => state.mainReducer.videogameDetails);
  const fetchingGameDetails = useSelector(state => state.mainReducer.fetchingGameDetails);
  const deleteVideogameStatus = useSelector(state => state.mainReducer.deleteVideogameStatus);
  const { name, background_image, Genres, genres,  platforms, rating,description_raw, released } = details;

  // function handleClick(e){
  //   dispatch(deleteVideogame(code)); 
  // }

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
    dispatch(getVideogameById(code))
      return function destroyDetails() {
        dispatch({type: DESTROY_DETAILS, payload: {}})
      }
  },[dispatch, code])

  useEffect(() => {
    console.log(fetchingGameDetails);
  }, [fetchingGameDetails])

  return(

      <div className={Style.mainContainer}>
        {!fetchingGameDetails ?  
          <div className={Style.apiMainContainer}>
            <div className={Style.bgImgContainer}>
              <img className={Style.bgImg} src={background_image ? background_image : background_img} alt="background" />
            </div>
            <div className={Style.gameDesc}>
              <h1>{name}</h1>
              <p>{description_raw}</p>
              <div className={Style.divisoryLineBigger}></div>
              <h2>Rating:  {rating}</h2>
              <h3>Released: {released}</h3>
              <div className={Style.genresAndPlatformContainer}>
                <div>
                  <h2>Genres </h2>
                  <div className={Style.divisoryLine}></div>
                  { genres ? genres?.map(genre =>{
                            return(
                              <h3 key={genre.id}>{genre.name}</h3>
                            )
                          }) 
                  : Genres?.map(genre =>{
                    return(
                      <h3 key={genre.id}>{genre.name}</h3>
                    )
                  })
                  }
                </div>
                { platforms ? 
                <div>
                  <h2>Platforms </h2>
                  <div className={Style.divisoryLine}></div>
                  {platforms?.map( platform => {
                    return (
                      <h3 key={platform.id}>{platform}</h3>
                    )})}
                </div> 
                : <h2>Cargando</h2>
                }
              </div>
            </div>
          </div> 
        : <h1>Cargando...</h1>
        }
      </div>
  )
}

export default VideogameDetail;