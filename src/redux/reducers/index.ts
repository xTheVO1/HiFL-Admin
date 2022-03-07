import { combineReducers } from 'redux';
import { userReducer  } from './auth';
import { teamReducer  } from './team';

const reducers = combineReducers({
auth: userReducer,
team: teamReducer
});

export default reducers;

//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducers>;