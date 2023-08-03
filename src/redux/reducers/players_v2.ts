import { POST_PLAYER_V2_FAILED,
        POST_PLAYER_V2_STARTED,
        POST_PLAYER_V2_SUCCESSFUL,
        GET_PLAYERS_V2_STARTED,
        GET_PLAYERS_V2_SUCCESSFUL,
        GET_PLAYERS_V2_FAILED,
        GET_PLAYER_V2_STARTED,
        GET_PLAYER_V2_SUCCESSFUL,
        GET_PLAYER_V2_FAILED,
        UPDATE_PLAYER_V2_STARTED,
        UPDATE_PLAYER_V2_SUCCESSFUL,
        UPDATE_PLAYER_V2_FAILED,
        DELETE_PLAYER_V2_SUCCESSFUL,
        DELETE_PLAYER_V2_STARTED,
        DELETE_PLAYER_V2_FAILED,
        GET_PLAYER_V2_LICENSE_STARTED,
        GET_PLAYER_V2_LICENSE_SUCCESSFUL,
        GET_PLAYER_V2_LICENSE_FAILED,
    } from "../actions/actionTypes";

const  initialState = {
  playerV2:{},
  playersV2:[],
  singlePlayerV2: {},
  loading: false,
  error: null,
  deletedPlayerV2: {},
  license: []
}

export const playerV2Reducer = (state: PlayerV2State = initialState, action: any):PlayerV2State => {
    switch(action.type) {
      case POST_PLAYER_V2_STARTED:
        return {
          ...state,
          loading: true
        }
      case POST_PLAYER_V2_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          playerV2: action.payload
        }
      case POST_PLAYER_V2_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case GET_PLAYERS_V2_STARTED:
          return {
            ...state,
            loading: true
          }
        case GET_PLAYERS_V2_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            playersV2: action.payload
          }
        case GET_PLAYERS_V2_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
        case GET_PLAYER_V2_STARTED:
        return {
          ...state,
          loading: true
        }
        case GET_PLAYER_V2_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            singlePlayerV2: action.payload
          }
        case GET_PLAYER_V2_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
          case GET_PLAYER_V2_LICENSE_STARTED:
            return {
              ...state,
              loading: true
            
            }
            case GET_PLAYER_V2_LICENSE_SUCCESSFUL: 
              return {
                ...state,
                loading: false,
                license: action.payload
              }
            case GET_PLAYER_V2_LICENSE_FAILED:
              return {
                ...state,
                loading: false,
                error: action.payload
              }
          case UPDATE_PLAYER_V2_STARTED:
            return {
              ...state,
              loading: true
            }
          case UPDATE_PLAYER_V2_SUCCESSFUL: 
            return {
              ...state,
              loading: false,
              playerV2: action.payload
            }
          case UPDATE_PLAYER_V2_FAILED:
            return {
              ...state,
              loading: false,
              error: action.payload
            }
            case DELETE_PLAYER_V2_STARTED:
            return {
              ...state,
              loading: true
            }
          case DELETE_PLAYER_V2_SUCCESSFUL: 
            return {
              ...state,
              loading: false,
              deletedPlayerV2: action.payload
            }
          case DELETE_PLAYER_V2_FAILED:
            return {
              ...state,
              loading: false,
              error: action.payload
            }
    }
      return state;
}