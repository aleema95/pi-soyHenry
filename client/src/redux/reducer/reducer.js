import { 
  GET_ALL_VIDEOGAMES,
  GET_ALL_GENRES, 
  FETCHING,
  FAILED_FETCH, 
  PAGE_NEXT,
  PAGE_BACK, 
  FILTER,
  SET_FILTER,
  GET_POKEMON_BY_ID,
  DESTROY_DETAILS,
  VIDEOGAME_CREATE_SUCCESS,
  VIDEOGAME_CREATE_FAILED,
  RESET_CREATE_VIDEOGAME_STATUS,
  VIDEOGAME_DELETE_SUCCESS,
  VIDEOGAME_DELETE_FAILED,
  RESET_DELETE_VIDEOGAME_STATUS
} from "../actions/actions";



const initialState = {
  allVideogames: [],
  allGenres: [],
  filteredVideogames: [],
  videogameDetails: {},
  objectPagination: { currentPage: 1, pages: 0, from:0, to: 15, name:"", genre:"", createdByUser: false, sort: ""},
  fetching: false,
  errorHandler: false,
  createVideogameStatus: "",
  deleteVideogameStatus: ""
}


const mainReducer = (state = initialState, action)=> {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      const totalPages = Math.ceil(action.payload.length/15);
      return{
        ...state,
        fetching: false,
        allVideogames: action.payload,
        objectPagination: {...state.objectPagination, pages: totalPages},
        filteredVideogames: action.payload.slice(state.objectPagination.from, state.objectPagination.to)
      };
    
    case GET_ALL_GENRES:
      return{
        ...state,
        allGenres: action.payload,
      };

    case VIDEOGAME_CREATE_SUCCESS:
      return{
        ...state,
        createVideogameStatus: action.payload,
      };
    
    case VIDEOGAME_CREATE_FAILED:
      return{
        ...state,
        createVideogameStatus: action.payload,
      };
    
    case RESET_CREATE_VIDEOGAME_STATUS:
      return{
        ...state,
        createVideogameStatus: initialState.createVideogameStatus,
      };

    case VIDEOGAME_DELETE_SUCCESS:
      return{
        ...state,
        deleteVideogameStatus: action.payload,
      };
  
    case VIDEOGAME_DELETE_FAILED:
      return{
        ...state,
        deleteVideogameStatus: action.payload,
      };
  
    case RESET_DELETE_VIDEOGAME_STATUS:
      return{
        ...state,
        deleteVideogameStatus: initialState.deleteVideogameStatus,
      };

    case FETCHING:
      return {
        ...state,
        fetching: true,
      };
    
    case FAILED_FETCH:
      return {
        ...state,
        fetchin: false,
        errorHandler: true
      };

    case DESTROY_DETAILS:
      return {
        ...state,
        videogameDetails: action.payload,
      }

    case PAGE_NEXT:{
      //crear logica para evitar bug
      const from = state.objectPagination.from + 15;
      const to = state.objectPagination.to + 15;
      const nextPage = state.objectPagination.currentPage + 1;
        return {
          ...state,
          objectPagination: {...state.objectPagination, currentPage: nextPage, to: to, from: from},
          filteredVideogames: state.allVideogames.slice(from, to)
        }; 
    }
   
    case PAGE_BACK:{
      //crear logica para evitar bug
      const from = state.objectPagination.from - 15;
      const to = state.objectPagination.to - 15;
      const prevPage = state.objectPagination.currentPage - 1;
      return {
        ...state,
        objectPagination: {...state.objectPagination, currentPage: prevPage, to: to, from: from},
        filteredVideogames: state.allVideogames.slice(from, to)
      };
    }

    case SET_FILTER:{
      //crear logica para evitar bug
      return {
        ...state,
        objectPagination: {   ...state.objectPagination, 
                              currentPage: 1,
                              from: 0, 
                              to:15, 
                              name: action.name, 
                              genre: action.genre, 
                              createdByUser: action.createdByUser,
                              sort: action.sort
                            },
      }
    }

    case FILTER: {
      //==================== FILTRO =======================
       const aux = state.allVideogames.filter(function(game){

          if (!game.name.toLowerCase().startsWith(state.objectPagination.name.toLowerCase())) return false; 
          let genreFalse = game.Genres.some(function(genre) {
          if(state.objectPagination.genre === "") return true;
          return genre.name === state.objectPagination.genre; 
          });
          if(!genreFalse) return false;
          if(state.objectPagination.createdByUser){
            return game.created_by_user
          }
        return true
      });
      //==================== SORT =======================
      if(state.objectPagination.sort === "A-Z") {
        aux.sort(function(a,b) {
          if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
          return 0;
        })
      }
      if (state.objectPagination.sort === "Z-A") {
        aux.sort(function(a,b) {
          if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          if(b.name.toLowerCase() < a.name.toLowerCase()) return -1;
          return 0;
        })
      }
      if (state.objectPagination.sort === "Rating Asc") {
        aux.sort(function(a,b) {
          if(a.rating < b.rating) return 1;
          if(b.rating < a.rating) return -1;
          return 0;
        })
      }
      if (state.objectPagination.sort === "Rating Des") {
        aux.sort(function(a,b) {
          if(a.rating > b.rating) return 1;
          if(b.rating > a.rating) return -1;
          return 0;
        })
      }
      //==================== PAGINADO =======================
      const pages = Math.ceil(aux.length/15);
      const slicedAux = aux.slice(state.objectPagination.from, state.objectPagination.to)
      
      return {
        ...state,
        filteredVideogames: slicedAux,
        objectPagination: {...state.objectPagination, pages: pages}
      };
    }

    case GET_POKEMON_BY_ID:
      return {
        ...state,
        videogameDetails: action.payload
      }

    default: 
      return state;
  }
}

export default mainReducer;



//videogames: []
//FG: [] copia de videogames cuando no hay filtro 

//=============================================
//filtro por generos:
// filtrar sobre FG


//return
// ...state,
// videogames: = al filtro
// FG: = al filtro

//=========================================================

//filtro por DB:

// const filtro = filtrar por FG


//return 
//...state,
//videogames: filtro
//FG: filtro

