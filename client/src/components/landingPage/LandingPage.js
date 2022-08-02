import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getAllVideogames } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import Style from './LandingPage.module.css'



function LandingPage(props) {

  const dispatch = useDispatch();


  const fetchingVideogames = useSelector(state => state.mainReducer.fetching);
  const errorHandler = useSelector(state => state.mainReducer.errorHandler);

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenres());
  },[dispatch])


  return (
      <div className={Style.bgImage}>
        <h1>Bienvenido a la libreria de juegos.</h1>
        <div className={Style.buttonContainer}>
          {fetchingVideogames ?
            <h1 className={Style.loading}>Loading...</h1> :
            errorHandler ? <h1>Error...</h1> :
          <Link to={"/home"}>
            <button className={Style.ingresarBtn}>Ingresar</button>
          </Link>}
        </div>
      </div>
  )
}


export default LandingPage;