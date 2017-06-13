import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import App from './components/App';
import app_reducer from './reducers';

import {Saga} from './sagas';

import createSagaMiddleware from 'redux-saga'

import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';
import ChatBox from './components/ChatBox';
import ArticleList from './components/ArticleList';

const sagaMiddleware= createSagaMiddleware()
const store = createStore(app_reducer,
applyMiddleware(sagaMiddleware));

sagaMiddleware.run(Saga)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root')
);
