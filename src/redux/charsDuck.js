import axios from 'axios';

// state
const INITIAL_STATE = {
  fetching: false,
  charsArray: [],
  current: {}
};

const URL = 'https://rickandmortyapi.com/api/character';
const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';

const REMOVE_CHARACTER = 'REMOVE_CHARACTER';

// reducer
export const charsDuck = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        fetching: true
      };
    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        charsArray: action.payload,
        fetching: false
      };
    case GET_CHARACTERS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };

    case REMOVE_CHARACTER:
      return {
        ...state,
        charsArray: action.payload
      };
    default:
      return state;
  }
};

// actions (thunks) - actions-creators
export const getCharactersAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS
  });

  return axios
    .get(URL)
    .then(res => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: err.response.message
      });
    });
};

export const removeCharacterAction = () => (dispatch, getState) => {
  let { charsArray } = getState().characters;
  charsArray.shift();
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...charsArray]
  });
};
