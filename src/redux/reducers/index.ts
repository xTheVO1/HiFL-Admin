import { combineReducers } from 'redux';
import { userReducer  } from './auth';
import { teamReducer  } from './team';
import { settingsReducer  } from './settings';
import { leagueReducer } from './leagues';
import { seasonReducer  } from './seasons';
import { instituteReducer  } from './institutions';
import { playerReducer } from './players';
import { playerV2Reducer } from './players_v2';
import { officialReducer } from './officials';
import { fileUploadReducer } from './fileUpload';
import { SportReducer} from "./sport";
import { FixtureReducer } from './fixture';
import { StoreReducer } from './store';
import { volunteerReducer } from './volunteer';

const reducers = combineReducers({
auth: userReducer,
team: teamReducer,
player: playerReducer,
playerV2: playerV2Reducer,
officials: officialReducer,
institution: instituteReducer,
seasons: seasonReducer,
leagues: leagueReducer,
files: fileUploadReducer,
sports: SportReducer,
settings: settingsReducer,
fixtures: FixtureReducer,
volunteers: volunteerReducer,
store: StoreReducer
});

export default reducers;

//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducers>;