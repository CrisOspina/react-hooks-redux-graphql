// states iniciales de las app
let INITIAL_STATE = {
  loggedIn: false
};

// const para referenciar los action.type
let LOGIN = 'LOGIN';

// reducers
export const userDuck = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      break;

    default:
      return state;
  }
};

// actions (thunks)
