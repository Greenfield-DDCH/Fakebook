import  {combineReducers} from 'redux';
import userReducer from './reducers-user';
import currentUserReducer from './reducers-currentUser';
import changePostsReducer from './reducers-changePosts';

const allReducers = combineReducers({
  user: userReducer,
  currentUser: currentUserReducer,
  currentUserPosts: changePostsReducer
});

export default allReducers;