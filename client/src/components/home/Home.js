import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, FILTER, PAGE_NEXT, PAGE_BACK, SET_FILTER, getAllGenres } from "../../redux/actions/actions";
import VideogameCard from "../videogameCard/VideogameCard";
import Style from './Home.module.css';

function Home(props){
  const dispatch = useDispatch();

  const genreFilter = useRef("");
  const nameFilter = useRef("");
  const createdByUser = useRef(false);
  const sortGamesByAZ = useRef("");
  const searchNameInput = useRef(null)
  
  const videogames = useSelector(state => state.mainReducer.allVideogames);
  const fetching = useSelector(state => state.mainReducer.fetching);
  const filteredVideogames = useSelector(state => state.mainReducer.filteredVideogames);
  const objPagination = useSelector(state => state.mainReducer.objectPagination);
  const allGenres = useSelector(state => state.mainReducer.allGenres);
      
  function handleChange(e) {
    nameFilter.current = e.target.value
    dispatch({type: SET_FILTER, name: nameFilter.current, genre: genreFilter.current, createdByUser: createdByUser.current, sort: sortGamesByAZ.current });
    dispatch({type: FILTER});
  }

  function handleClick(e) {
    e.preventDefault();
    //========================= Paginado ===================================
    if(e.target.name === 'next') {
      if(objPagination.currentPage === objPagination.pages) return
      dispatch({type: PAGE_NEXT})
      dispatch({type: FILTER})
      return
    } 
    if(e.target.name === 'prev') {
      if(objPagination.currentPage === 1) return
      dispatch({type: PAGE_BACK})
      dispatch({type: FILTER})
      return
    } 
    //========================= Filtros ===================================
    if(e.target.name === 'genre'){ 
      genreFilter.current = e.target.value;
    }
    if(e.target.name === "reset"){
      searchNameInput.current.value = "";
      genreFilter.current = "";
      nameFilter.current = "";
      sortGamesByAZ.current = "";
      createdByUser.current = false;
    }
    if(e.target.name === "createdByUser"){
      createdByUser.current = !createdByUser.current
    }
    //========================= Sort ===================================
    if (e.target.name === "sort") {
     sortGamesByAZ.current = e.target.value;
    }
    dispatch({type: SET_FILTER, name: nameFilter.current, genre: genreFilter.current, createdByUser: createdByUser.current, sort: sortGamesByAZ.current });
    dispatch({type: FILTER}); 
  }

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenres());
  },[dispatch]) 

  return(
    fetching ? <h1>Loading...</h1> :
    <div className={Style.mainContainer}>
      <div className={Style.filtersContainer}>
          <input className={Style.searchBarInput} ref={searchNameInput} placeholder="Search videogame by name..." type="text" name="name" onChange={handleChange} />
        <div className={Style.inputContainer}>
          <input onClick={handleClick} type="button" name="createdByUser" value={"Created by User"}/>
          <div className={Style.sortBtnContainer}>
            <input onClick={handleClick} type="button" name="sort" value={"A-Z"} />
            <input onClick={handleClick} type="button" name="sort" value={"Z-A"} />
          </div>
          <div className={Style.sortBtnContainer}>
            <input onClick={handleClick} type="button" name="sort" value={"Rating Asc"} />
            <input onClick={handleClick} type="button" name="sort" value={"Rating Des"} />
          </div>
          <input onClick={handleClick} type="button" name="reset" value={"Reset"} />
        </div>
        <div className={Style.genresContainer}>
          {allGenres?.map((genre) => {
            return (
              <div key={genre.id} className={`${Style.genreInputContainer}`}>
                <input onClick={handleClick} type="button" name='genre' id={genre.id} value={genre.name}/>
              </div>
            )
          })}
        </div>
      </div>
      <div className={Style.videogamesPaginationContainer}>
        <div className={Style.nextPrevPageContainer}>
          {objPagination.pages === 0 ? <h1>No se encontraron juegos.</h1> :
           objPagination.pages === 1 ? null : 
            <>
            <button disabled={objPagination.from <= 0} name="prev" onClick={handleClick}>{`<`} Previous </button>
            {<h3>{objPagination.currentPage} of {objPagination.pages}</h3>}
            <button disabled={objPagination.to >= videogames.length} name="next" onClick={handleClick}>Next {`>`}</button>
            </>
          }
        </div>
        <div className={Style.videogamesContainer}>
          {filteredVideogames?.map(game => {
            return <VideogameCard key={game.id} {...game}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Home;