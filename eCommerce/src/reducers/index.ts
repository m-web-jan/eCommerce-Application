import { combineReducers } from 'redux';
import authReducer from './authReducer.ts';
import registerReducer from './registerReducer.ts';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
});

export default rootReducer;
