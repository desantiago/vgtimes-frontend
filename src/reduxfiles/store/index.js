import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import measureMiddleware from '../middleware/measure';
import apiMiddleware from '../middleware/api';

const store = createStore(rootReducer, applyMiddleware(measureMiddleware, apiMiddleware));

export default store;