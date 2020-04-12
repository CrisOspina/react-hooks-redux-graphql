import { loginWithGoogle, signOutGoogle } from '../firebase'
import { retreiveFavs } from './charsDuck'

let INITIAL_STATE = {
  loggedIn: false,
  fetching: false,
  error: ''
}

// const para referenciar los action.type
let LOGIN = 'LOGIN'
let LOGIN_SUCCESS = 'LOGIN_SUCCESS' 
let LOGIN_ERROR = 'LOGIN_ERROR'

let LOG_OUT = 'LOG_OUT'

// reducers
export const userDuck = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        fetching: true
      }
    
    case LOGIN_SUCCESS: 
      return {
        ...state,
        fetching: false,
        ...action.payload,
        loggedIn: true
      }

    case LOGIN_ERROR: 
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    case LOG_OUT:
      return { ...INITIAL_STATE }

    default:
      return state
  }
}

// actions (thunks)
export const doGoogleLoginAction = () => (dispatch, getState) => {

  dispatch({
    type: LOGIN
  })

  return (
    loginWithGoogle()
    .then(user => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photo: user.photoURL
        }
      })

      // Guarda en el localstorage
      saveStorage(getState())

      // Carga los favoritos
      retreiveFavs()(dispatch, getState)
    })
    .catch(e => {
      console.log(e)
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message
      })
    })
  )
}

// Guardar en el localstorage
const saveStorage = storage => {
  localStorage.storage = JSON.stringify(storage)
}

// Recuperamos la sesión en redux
export const restoreSessionAction = () => (dispatch, getState) => {
  let storage = localStorage.getItem('storage')
  storage = JSON.parse(storage)

  if(storage && storage.loggIn.loggedIn){
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.loggIn.loggedIn
    })
  }
}

// Cerrar sesión
export const logOutAction = () => (dispatch, getState) => {
  signOutGoogle()
  dispatch({
    type: LOG_OUT
  })
  localStorage.removeItem('storage')
  localStorage.removeItem('favs')
}