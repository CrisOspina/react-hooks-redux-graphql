import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userDuck } from './userDuck';
import { charsDuck, getCharactersAction } from './charsDuck';

let rootReducer = combineReducers({
  loggIn: userDuck,
  characters: charsDuck
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const generateStore = () => {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  // personajes por primera vez
  getCharactersAction()(store.dispatch, store.getState);

  return store;
};
