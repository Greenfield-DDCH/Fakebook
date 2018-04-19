import  {combineReducers} from 'redux';
import userReducer from './reducers-user';
import currentUserReducer from './reducers-currentUser';
import changePostsReducer from './reducers-changePosts';
import changeIsFriend from './reducers-changeIsFriend';
import getFriends from './reducers-getFriends';

const allReducers = combineReducers({
  user: userReducer,
  currentUser: currentUserReducer,
  currentUserPosts: changePostsReducer,
  isFriend: changeIsFriend,
  friends: getFriends
});

export default allReducers;