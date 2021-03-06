/**
 * Created by mobiloitte on 07/07/17.
 */
import { createStore,applyMiddleware} from 'redux';
import {  routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import logger from 'redux-logger'
import reducers from '../reducer/index';
import { compose } from 'redux';
import replicate from 'redux-replicate';
import localforage from 'redux-replicate-localforage';

export default function configureStore(initialState) {
    const history = createHistory();
    const middleware = routerMiddleware(history);
    const key = 'Storage';
    const reducerKeys = true;
    const replicator = localforage;
    const replication = replicate({ key, reducerKeys, replicator });
    const create = compose(replication)(createStore);
    if(process.env.NODE_ENV === 'development') {
        return create(reducers,
            initialState,applyMiddleware(middleware,logger));
    }else {
        return createStore(reducers,
           applyMiddleware(middleware), initialState);
    }
}