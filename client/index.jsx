import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import App from './components/App';
import Post from './components/post';


const store = createStore(allReducers);

ReactDOM.render(<Provider store={store}>
   <Post />
</Provider>, document.getElementById("app"));
