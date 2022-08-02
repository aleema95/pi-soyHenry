import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createVideogame, getAllGenres } from "../../redux/actions/actions";
import { useNavigate } from 'react-router-dom'
import Style from './CreateVideogame.module.css'
import Genre from "./genre/Genre";
import Platform from "./platforms/Platform";

export const platformsDb = [
  {
    id: 1,
    name: "Playstation"
  },
  {
    id: 2,
    name: "Playstation 2"
  },
  {
    id: 3,
    name: "Playstation 3"
  },
  {
    id: 4,
    name: "Playstation 4"
  },
  {
    id: 5,
    name: "Playstation 5"
  },
  {
    id: 6,
    name: "XBOX"
  },
  {
    id: 7,
    name: "Xbox Series S/X"
  },
  {
    id: 8,
    name: "Xbox 360"
  },
  {
    id: 9,
    name: "Xbox One"
  },
  {
    id: 10,
    name: "PC"
  },
  {
    id: 11,
    name: "Wii"
  },
  {
    id: 12,
    name: "Wii U"
  },
  {
    id: 13,
    name: "Switch"
  }
]

function CreateVideogame(props) {
  const navigate = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [newGame, setNewGame] = useState({name: '', description: '', rating: "", release_date:"" , genres: [], platforms: []})
  const [error, setError] = useState({})

  const dispatch = useDispatch(); 

  const genres = useSelector(state => state.mainReducer.allGenres);

  function formValidation(obj){

    let error = {};

    const { name, description, rating, genres, platforms, release_date } = obj;
    if(!name) error.name = 'Name is required.'; 
    if(!description) error.description = 'Description is required.';
    if(!release_date) error.release_date = 'Release date is required.';
    if(!rating) {
      error.rating = 'Rating is required.';
    } else if (/[^1234567890]/g.test(parseInt(rating))) {
      error.rating = 'Should be only numbers.';
    } else if (parseInt(rating) < 1 || parseInt(rating) > 5) {
      error.rating = 'Should be between 1 and 5.';
    }
    if (!genres.length) error.genres = 'You must chose at least 1 genre.';
    if (!platforms.length) error.platform = 'You must chose at least 1 platform.';

    return error;
  }

  function handleChange(e){
    setNewGame((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,    
    }));

    let objError = formValidation({...newGame});
    setError(objError)
  }
  //checkear si el navigate no funcionaba por el dispatch
  function handleSubmit(e){
    if(Object.keys(error).length === 0) {
        e.preventDefault();
        dispatch(createVideogame(newGame));
        setNewGame({name: '', description: '', rating: "", release_date: "" ,genres: [], platforms: []})
        return setTimeout(() => {
           navigate('/home') 
        }, 100)       
      } 
      e.preventDefault();
      alert('Check field information')
  }
  
  function addGenreAndPlatform(inputName, value){
    if(inputName === 'genres'){
      if (selectedGenre.includes(value)) {
        setSelectedGenre(selectedGenre.filter( x => x !== value))
      } else {
        setSelectedGenre(
          [...selectedGenre,
          value])
      }
    } else {
      if (selectedPlatform.includes(value)) {
        setSelectedPlatform(selectedPlatform.filter( x => x !== value))
      } else {
        setSelectedPlatform(
          [...selectedPlatform,
          value])
      }
    }   
  }

  useEffect( ()=> {
    let objError = formValidation({...newGame});
    setError(objError)
  },[newGame])

  useEffect(() => {
    setNewGame( (prev) => ({
      ...prev,
      genres: selectedGenre,
      platforms: selectedPlatform,
    }))
  },[selectedPlatform, selectedGenre]);

  useEffect(() => {
    dispatch(getAllGenres());
  },[dispatch])

  return(
    <div className={Style.mainContainer}>
      <form id='myForm' className={Style.formContainer} onSubmit={handleSubmit}>
        <div className={Style.inputsContainer}>
          <input className={Style.writingInput} onChange={handleChange} type="text" name='name' id='name' placeholder="Name..." value={newGame.name}/>
          {error.name ? <p>{error.name}</p> : <p></p>}

          <input className={Style.writingInput} onChange={handleChange} type="textarea" name='description' id='description' placeholder="Description..." value={newGame.description}/>
          {error.description ? <p>{error.description}</p> : <p></p>}

          <label className={Style.dateInput} htmlFor='release_date'>Release date: </label>
          <input  onChange={handleChange} 
                  type="date"
                  name='release_date' 
                  id='release_date' 
                  min="1960-01-01"
                  max="2100-12-031"
                  value={newGame.release_date}
          />
          {error.release_date ? <p>{error.release_date}</p> : <p></p>}

          <input className={Style.writingInput} onChange={handleChange} type="text" name='rating' id='rating' placeholder="Rating..." value={newGame.rating}/>
          {error.rating ? <p>{error.rating}</p> : <p></p>}
          <input className={Style.submitBtn} type='submit' />
        </div>
        

        <div className={Style.mainGenresPlatformContainer}>
          <h3>Genres</h3>
          <div className={Style.divisoryLine}></div>
          <div className={Style.genresContainer}>
            {genres?.map((genre) => <Genre 
                                    key={genre.id} 
                                    {...genre} 
                                    addGenreAndPlatform={addGenreAndPlatform}
                                    handleChange={handleChange}
                                    /> )}
          </div>
          {error.genres ? <p>{error.genres}</p> : <p></p>}

          <h3>Platforms</h3>
          <div className={Style.divisoryLine}></div>
          <div className={Style.genresContainer}>
            {platformsDb?.map( platform => <Platform 
                                            key={platform.id}
                                            {...platform} 
                                            addGenreAndPlatform={addGenreAndPlatform}
                                            handleChange={handleChange} 
                                            />)}
          </div>
          {error.platform ? <p>{error.platform}</p> : <p></p>}
        </div>
      </form>
    </div>
  )

}

export default CreateVideogame;