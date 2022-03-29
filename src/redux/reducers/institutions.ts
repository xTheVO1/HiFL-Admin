import {
    GET_TEAMS_STARTED,
    GET_TEAMS_SUCCESSFUL,
    GET_TEAMS_FAILED
} from "../actions/actionTypes";



const  initialState = {
  teams:[],
  team:[],
  loading: false,
  error: null
}

export const teamReducer = (state: TeamState = initialState, action: any):TeamState => {
    switch(action.type) {
      case  GET_TEAMS_STARTED:
        return {
          ...state,
          loading: true
        }
      case GET_TEAMS_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          team: action.payload
        }
      case GET_TEAMS_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
    }
      return state;
}
     