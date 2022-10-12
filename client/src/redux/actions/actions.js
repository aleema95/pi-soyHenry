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
export const VIDEOGAME_CREATE_SUCCESS = "VIDEOGAME_CREATE_SUCCESS";
export const VIDEOGAME_CREATE_FAILED = "VIDEOGAME_CREATE_FAILED";
export const RESET_CREATE_VIDEOGAME_STATUS = "RESET_CREATE_VIDEOGAME_STATUS";
export const RESET_DELETE_VIDEOGAME_STATUS = "RESET_DELETE_VIDEOGAME_STATUS";
export const VIDEOGAME_DELETE_SUCCESS = "VIDEOGAME_DELETE_SUCCESS";
export const VIDEOGAME_DELETE_FAILED = "VIDEOGAME_DELETE_FAILED";
export const FETCHING_VIDEOGAME_DETAILS = "FETCHING_VIDEOGAME_DETAILS";
export const FETCHING_VIDEOGAME_DETAILS_FAILURE = "FETCHING_VIDEOGAME_DETAILS_FAILURE";
export const FETCHING_VIDEOGAME_DETAILS_SUCCESS = "FETCHING_VIDEOGAME_DETAILS_SUCCESS";




export function getAllVideogames() {
  return dispatch =>{
    dispatch({type: FETCHING})
    return axios.get(`/videogames`)
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
    dispatch({type: FETCHING_VIDEOGAME_DETAILS})
    return axios.get(`/videogames/${id}`)
    .then(json => {
      dispatch({type: GET_POKEMON_BY_ID, payload: json.data})
      dispatch({type: FETCHING_VIDEOGAME_DETAILS_SUCCESS})
    }).catch(err => {
      console.error(err);
      dispatch({type: FETCHING_VIDEOGAME_DETAILS_FAILURE})
    })
  }
}

export function getAllGenres(){
  return dispatch => {
    dispatch({type: FETCHING})
    return axios.get(`/genres`)
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
    return axios.post('/videogames', payload)
              .then( r => dispatch({type: VIDEOGAME_CREATE_SUCCESS, payload: 'success'}))
              .catch(err => dispatch({type: VIDEOGAME_CREATE_FAILED, payload: 'error'}))
  }
}

export function deleteVideogame(id) {
  return dispatch => {
    return axios.delete(`/videogames/${id}`)
              .then( r => dispatch({type: VIDEOGAME_DELETE_SUCCESS, payload: 'success'}))
              .catch( err =>dispatch({type: VIDEOGAME_DELETE_FAILED, payload: 'error'}))
  }
}
