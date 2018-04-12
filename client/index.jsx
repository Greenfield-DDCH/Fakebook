import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import App from './components/App';
import Post from './components/post';


const store = createStore(allReducers);

<<<<<<< HEAD
ReactDOM.render( <Provider store={store}>
  <App />
</Provider>, document.getElementById('app'));
=======
ReactDOM.render(<Provider store={store}>
   <Post />
</Provider>, document.getElementById("app"));
>>>>>>> 7f18b2b0d979a08c511d7f7a3ef2d0b7448ab300
