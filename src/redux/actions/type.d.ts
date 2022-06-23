interface IUser {
  isLogin: boolean;
  acccesToken: string;
  User: {
    _id: string;
    Email: string;
    Password: string;
    Username: string;
    Firstname: string;
    Lastname: string;
    Role: string;
  };
}

interface UserState {
  user: IUser[];
  loading: boolean;
  error: string | null;
}

type UserAction = {
  type: string;
  payload: IUser;
};

type ITeam = {
  _id: string;
  TeamName: string;
  Overview: string;
  Category: string;
  Sport: string;
  Institution: string;
  TeamLogo: string;
};

interface TeamState {
  teams: any;
  singleTeam: any;
  team: ITeam[];
  loading: boolean;
  error: any;
}

type TeamAction = {
  type: string;
  payload: ITeam[];
};

type IPlayer = {
  _id: string;
  User: string;
  MiddleName: string;
  DateOfBirth: string;
  Address: any;
  Age: string;
  NextOfKin: any;
};

interface PlayerState {
  players: any;
  player: any;
  license: any;
  singlePlayer: any;
  loading: boolean;
  error: any;
  deletedPlayer: any;
}

type PlayerAction = {
  type: string;
  payload: ITeam[];
};

type IOfficial = {
  _id: string;
  User: string;
  MiddleName: string;
  SchoolAddress: string;
  StreetAddress: string;
  NearestBusStop: string;
  State: string;
  LocalGovt: string;
  SchLGA: string;
  Dateofbirth: string;
  Age: number;
  FullNameOfKin: string;
  kinRelationship: string;
  kinPhone: string;
  kinAddress: string;
  kinEmail: string;
};
interface OfficialState {
  officials: any;
  official: any;
  newOfficial: any;
  loading: boolean;
  error: any;
}

type OfficialAction = {
  type: string;
  payload: IOfficial[];
};

type IInstitution = {
  _id: string;
  InstitutionName: string;
  Abbreviation: string;
  InstitutionType: string;
  __v: number;
  Description: string;
  Location: string;
  props: {};
};
interface InstitutionState {
  institutions: any;
  institution: any;
  newInstitution: any;
  loading: boolean;
  error: any;
}

type InstitutionAction = {
  type: string;
  payload: IInstitution[];
};

type ISeason = {
  _id: string;
  InstitutionName: string;
  Abbreviation: string;
  InstitutionType: string;
  __v: number;
  Description: string;
  Location: string;
  props: {};
};
interface SeasonState {
  seasons: any;
  season: any;
  newSeason: any;
  loading: boolean;
  error: any;
}

type SeasonAction = {
  type: string;
  payload: IOfficial[];
};

type ISetting = {
    CurrentSeason:	string;
    CurrentLeague:	string;
    CurrentStage:	string;
}

interface SettingState {
  settings: any;
  loading: boolean;
  postLoading: boolean;
  updatedSetting: any;
  newSetting: any;
  error: any;
  selectedItem: any;
  getItem: any;
  singleSettings: any;
}

type SettingAction = {
  type: string;
  payload: ISport[];
};

type ILeague = {
  _id: string;
  InstitutionName: string;
  Abbreviation: string;
  InstitutionType: string;
  __v: number;
  Description: string;
  Location: string;
  props: {};
};

interface LeagueState {
  leagues: any;
  league: any;
  newLeague: any;
  newStage: any;
  loading: boolean;
  error: any;
  updatedLeague: any;
  leagueStage: any;
  leagueStages: any;
  leagueStageLoading: any,
  leagueStagesLoading: any,
  leaguesLoading: any
  leagueLoading: any;
  updatedLeagueStage: any
}

type LeagueAction = {
  type: string;
  payload: IOfficial[];
};

type ISport = {
  TeamName: string,
  Overview: string,
  Institution: string,
  Category: string,
  Sport: string,
  TeamManagers: [] 
}

interface SportState {
sports: any;
loading: boolean;
error: {}
}

type SportAction = {
  type: string;
  payload: ISport[];
};

type IFileUpload = {
  _id: string;
  Etag: string,
  Location: string,
  key: string,
  Bucket: string
};

interface FileUploadState {
  file: any;
  fileLoading: boolean;
  error: any;
}

type FileUploadAction = {
  type: string;
  payload: IFileUpload[];
};

type IFixture = {
  TeamName: string,
  Overview: string,
  Institution: string,
  Category: string,
  Sport: string,
  TeamManagers: [] 
}

interface FixtureState {
fixtures: any;
fixture: any;
updatedFixture: any;
newFixture: any;
loading: boolean;
error: {},
updateLoading: boolean,
}

type FixureAction = {
  type: string;
  payload: IFixture[];
};

type UserDispatchType = (args: UserAction) => UserAction;
type TeamDispatchType = (args: TeamAction) => TeamAction;
type PlayerDispatchType = (args: PlayerAction) => PlayerAction;
type OfficialDispatchType = (args: OfficialAction) => PlayerAction;
type InstitutionDispatchType = (args: InstitutionAction) => InstitutionAction;
type SeasonDispatchType = (args: SeasonAction) => SeasonAction;
type LeagueDispatchType = (args: LeagueAction) => LeagueAction;
type FileUploadDispatchType = (args: FileUploadAction) => FileUploadAction;
type SportDispatchType = (args: SportAction) => SportAction;
type FixtureDispatchType = (args: FixtureAction) => FixtureAction;
