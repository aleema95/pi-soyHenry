import axios from 'axios';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const FETCHING = 'FETCHING';
export const FAILED_FETCH = 'FAILED_FETCH';
export const PAGE_NEXT = "PAGE_NEXT";
export const PAGE_BACK = "PAGE_BACK";
export const FILTER = "FILTER";
export const SET_FILTER = "SET_FILTER";
export const GET_FILTERED_VIDEOGAME = "GET_FILTERED_VIDEOGAME";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const DESTROY_DETAILS = "DESTROY_DETAILS";



export function getAllVideogames() {
  return dispatch =>{
    dispatch({type: FETCHING})
    return axios.get(`http://localhost:3001/videogames`)
      .then(json => {
        dispatch({type: GET_ALL_VIDEOGAMES, payload: json.data})
      }).catch(err => {
        console.error(err)
        dispatch({type: FAILED_FETCH})
      })
  }
}

export function getVideogameById(id){
  return dispatch => {
    return axios.get(`http://localhost:3001/videogames/${id}`)
      .then(json => {
        dispatch({type: GET_POKEMON_BY_ID, payload: json.data})
      }).catch(err => {
        console.error(err);
      })
  }
}

export function getAllGenres(){
  return dispatch => {
    dispatch({type: FETCHING})
    return axios.get(`http://localhost:3001/genres`)
      .then(json => {
        dispatch({type: GET_ALL_GENRES, payload: json.data})
      }).catch( err => {
        console.error(err);
        dispatch({type:FAILED_FETCH})
      })
  }
}

export function createVideogame(payload){
  return dispatch => {
    return axios.post('http://localhost:3001/videogames', payload)
              .then( r => console.log(r.data))
              .catch(err => console.error(err))
  }
}

export function deleteVideogame(id) {
  return dispatch => {
    return axios.delete(`http://localhost:3001/videogames/${id}`)
              .then( r => console.log(r.data))
              .catch( err => console.log(err))
  }
}
