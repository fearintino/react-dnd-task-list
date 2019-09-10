import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import reducer from './reducers';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk, logger));

  if (module.hot) {
    module.hot.accept(
      // eslint-disable-next-line global-require
      './reducers', () => store.replaceReducer(require('./reducers').default),
    );
  }

  return store;
}
