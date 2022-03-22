import {  POST_OFFICIAL_STARTED,
          POST_OFFICIAL_SUCCESSFUL,
          POST_OFFICIAL_FAILED,
          GET_OFFICIAL_STARTED,
          GET_OFFICIAL_SUCCESSFUL,
          GET_OFFICIAL_FAILED,
          GET_OFFICIALS_STARTED,
          GET_OFFICIALS_SUCCESSFUL,
          GET_OFFICIALS_FAILED
    } from "../actions/actionTypes";

    type IOfficial = {
        _id: string,
        User: string,
        MiddleName: string,
        DateOfBirth: string,
        Age: 0,
        NextOfKin:any
      }
      interface State {
        officials: [],
       official: IPlayer[],
       newOfficial: {},
        loading: boolean,
        error: any
       }

const  initialState = {
  official:{},
  officials:[],
  newOfficial: {},
  loading: false,
  error: null
}

export const officialReducer = (state: OfficialState = initialState, action: any):OfficialState => {
    switch(action.type) {
      case POST_OFFICIAL_STARTED:
        return {
          ...state,
          loading: true
        }
      case POST_OFFICIAL_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          newOfficial: action.payload
        }
      case POST_OFFICIAL_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case GET_OFFICIALS_STARTED:
          return {
            ...state,
            loading: true
          }
        case GET_OFFICIALS_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            officials: action.payload
          }
        case GET_OFFICIALS_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
        case GET_OFFICIAL_STARTED:
        return {
          ...state,
          loading: true
        }
        case GET_OFFICIAL_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            official: action.payload
          }
        case GET_OFFICIAL_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
    }
      return state;
}