import  {combineReducers} from 'redux';
import userReducer from './reducers-user';
import currentUserReducer from './reducers-currentUser';
import changePostsReducer from './reducers-changePosts';
import changeIsFriend from './reducers-changeIsFriend';

const allReducers = combineReducers({
  user: userReducer,
  currentUser: currentUserReducer,
  currentUserPosts: changePostsReducer,
  isFriend: changeIsFriend
});

export default allReducers;