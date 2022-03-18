  interface IUser {
    isLogin: boolean
    acccesToken: string,
    User: {
      _id: string,
      Email: string,
      Password: string,
      Username: string,
      Firstname: string,
      Lastname: string,
      Role: string
    }
}

interface State {
  user: IUser[],
  loading: boolean,
  error: string | null
}

  type UserAction = {
    type: string
    payload: IUser
  }

type ITeam = {
     _id: string,
    TeamName: string,
    Overview: string,
    Category: string,
    Sport: string,
    Institution: string
  }
  
  interface TeamState {
    teams: any,
    team: ITeam[],
    loading: boolean,
    error: any
  }

type TeamAction = {
  type: string
  payload: ITeam[]
}

type IPlayer = {
  _id: string,
  User: string,
  MiddleName: string,
  DateOfBirth: string,
  Age: 0,
  NextOfKin:any
}

interface PlayerState {
 players: any,
player: IPlayer[],
 loading: boolean,
 error: any
}

type PlayerAction = {
type: string
payload: ITeam[]
}

  type UserDispatchType = (args: UserAction) => UserAction
  type TeamDispatchType = (args: TeamAction) => TeamAction
  type PlayerDispatchType = (args: PlayerAction) => PlayerAction