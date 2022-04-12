import { combineReducers } from 'redux';
import { userReducer  } from './auth';
import { teamReducer  } from './team';
import { leagueReducer } from './leagues';
import { seasonReducer  } from './seasons';
import { instituteReducer  } from './institutions';
import { playerReducer } from './players';
import { officialReducer } from './officials';
import { fileUploadReducer } from './fileUpload';

const reducers = combineReducers({
auth: userReducer,
team: teamReducer,
player: playerReducer,
officials: officialReducer,
institution: instituteReducer,
seasons: seasonReducer,
leagues: leagueReducer,
files: fileUploadReducer
});

export default reducers;

//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducers>;