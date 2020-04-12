// import axios from 'axios'
import ApolloClient, { gql } from 'apollo-boost'
import { updateDB, getFavs } from '../firebase'

// state
const INITIAL_STATE = {
  fetching: false,
  charsArray: [],
  current: {},
  favorites: [],
  nextPage: 1
}

const URL = 'https://rickandmortyapi.com/api/character'

let client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
})

const GET_CHARACTERS = 'GET_CHARACTERS'
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS'
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR'

const REMOVE_CHARACTER = 'REMOVE_CHARACTER'
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'

const GET_FAVS = 'GET_FAVS'
const GET_FAVS_SUCCESS = 'GET_FAVS_SUCCESS'
const GET_FAVS_ERROR = 'GET_FAVS_ERROR'

const UPDATE_PAGE = 'UPDATE_PAGE'

// reducer
export const charsDuck = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        fetching: true
      }

    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        charsArray: action.payload,
        fetching: false
      }

    case GET_CHARACTERS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    case REMOVE_CHARACTER:
      return {
        ...state,
        charsArray: action.payload
      }

    case ADD_TO_FAVORITES: 
      return {
        ...state,
        ...action.payload
      }

    case GET_FAVS:
      return {
        ...state,
        fetching: true
      }

    case GET_FAVS_SUCCESS:
      return {
        ...state,
        fetching: false,
        favorites: action.payload
      }

    case GET_FAVS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    case UPDATE_PAGE:
      return {
        ...state,
        nextPage: action.payload
      }

    default:
      return state
  }
}

// actions (thunks) - actions-creators
export const getCharactersAction = () => (dispatch, getState) => {
  let query = gql`
    query ($page: Int) {
      characters(page: $page){
        info {
          pages
          next
          prev
        }
        results {
          name
          image
        }
      }
    }
  `
  dispatch({
    type: GET_CHARACTERS
  })

  let { nextPage } = getState().characters

  return (
    client.query({ 
      query,
      variables: {
        page: nextPage
      }
    })
    .then(({ data, error }) => {
      console.log(data)
      if(error){
        dispatch({
          type: GET_CHARACTERS_ERROR,
          payload: error
        })
        return
      }

      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: data.characters.results
      })   

      dispatch({
        type: UPDATE_PAGE,
        payload: data.characters.info.next ? data.characters.info.next : 1
      })
    })
  )

  // return axios
  //   .get(URL)
  //   .then(res => {
  //     dispatch({
  //       type: GET_CHARACTERS_SUCCESS,
  //       payload: res.data.results
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     dispatch({
  //       type: GET_CHARACTERS_ERROR,
  //       payload: err.response.message
  //     })
  //   })
}

export const removeCharacterAction = () => (dispatch, getState) => {
  let { charsArray } = getState().characters
  charsArray.shift()
  if(!charsArray.length){
    getCharactersAction()(dispatch, getState)
    return
  }
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...charsArray]
  })
}

export const addFavoritesAction = () => (dispatch, getState) => {
  let { charsArray, favorites } = getState().characters
  let uid = getState().loggIn.loggedIn.uid
  let char = charsArray.shift()
  favorites.push(char)

  // Actualizar firestore
  if(uid){
    updateDB(favorites, uid)
  }

  dispatch({
    type: ADD_TO_FAVORITES,
    payload: {
      charsArray: [ ...charsArray ], 
      favorites: [ ...favorites ]
    }
  })
  saveFavsStorage([...favorites]);
}

export const retreiveFavs = () => (dispatch, getState) => {
  dispatch({
    type: GET_FAVS
  })

  let uid = getState().loggIn.uid

  return (
    getFavs(uid)
    .then(data => {
      dispatch({
        type: GET_FAVS_SUCCESS,
        payload: [...data]
      })

      saveFavsStorage([...data])

    })
    .catch(e => {
      console.log(e)
      dispatch({
        type: GET_FAVS_ERROR,
        payload: e.message
      })
    })
  )
}

// Guardar favs en el localstorage
const saveFavsStorage = favs => {
  localStorage.favs = JSON.stringify(favs)
}

// Recuperamos los favs en redux
export const restoreFavs = () => (dispatch, getState) => {
  let favs = localStorage.getItem('favs')
  favs = JSON.parse(favs)

  if(favs && favs.length > 0){
    dispatch({
      type: GET_FAVS_SUCCESS,
      payload: favs
    })
  }
}
