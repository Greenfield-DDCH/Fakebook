import  {combineReducers} from 'redux';
import userReducer from './reducers-user';
import currentUserReducer from './reducers-currentUser';

const allReducers = combineReducers({
  user: userReducer,
  currentUser: currentUserReducer
});

export default allReducers;