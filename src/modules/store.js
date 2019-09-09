import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import reducer from './reducer';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk, logger));

  if (module.hot) {
    module.hot.accept(
      './reducer', () => store.replaceReducer(require('./reducer').default),
    );
  }

  return store;
}
