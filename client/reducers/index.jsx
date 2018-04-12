import  {combineReducers} from 'redux';
import userReducer from './reducers-user';

const allReducers = combineReducers({
  user: userReducer
});

export default allReducers;