import { combineReducers } from 'redux';
import authReducer from './authReducer.ts';
import registerReducer from './registerReducer.ts';
import profileReducer from './profileReducer .ts';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  profile: profileReducer,
});

export default rootReducer;
