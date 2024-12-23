import { POST_PLAYER_FAILED,
        POST_PLAYER_STARTED,
        POST_PLAYER_SUCCESSFUL,
        GET_PLAYERS_STARTED,
        GET_PLAYERS_SUCCESSFUL,
        GET_PLAYERS_FAILED,
        GET_PLAYER_STARTED,
        GET_PLAYER_SUCCESSFUL,
        GET_PLAYER_FAILED,
        UPDATE_PLAYER_STARTED,
        UPDATE_PLAYER_SUCCESSFUL,
        UPDATE_PLAYER_FAILED,
        DELETE_PLAYER_SUCCESSFUL,
        DELETE_PLAYER_STARTED,
        DELETE_PLAYER_FAILED,
        GET_PLAYER_LICENSE_STARTED,
        GET_PLAYER_LICENSE_SUCCESSFUL,
        GET_PLAYER_LICENSE_FAILED,
    } from "../actions/actionTypes";

const  initialState = {
  player:{},
  players:[],
  singlePlayer: {},
  loading: false,
  error: null,
  deletedPlayer: {},
  license: []
}

export const playerReducer = (state: PlayerState = initialState, action: any):PlayerState => {
    switch(action.type) {
      case POST_PLAYER_STARTED:
        return {
          ...state,
          loading: true
        }
      case POST_PLAYER_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          player: action.payload
        }
      case POST_PLAYER_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case GET_PLAYERS_STARTED:
          return {
            ...state,
            loading: true
          }
        case GET_PLAYERS_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            players: action.payload
          }
        case GET_PLAYERS_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
        case GET_PLAYER_STARTED:
        return {
          ...state,
          loading: true
        }
        case GET_PLAYER_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            singlePlayer: action.payload
          }
        case GET_PLAYER_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
          case GET_PLAYER_LICENSE_STARTED:
            return {
              ...state,
              loading: true
            
            }
            case GET_PLAYER_LICENSE_SUCCESSFUL: 
              return {
                ...state,
                loading: false,
                license: action.payload
              }
            case GET_PLAYER_LICENSE_FAILED:
              return {
                ...state,
                loading: false,
                error: action.payload
              }
          case UPDATE_PLAYER_STARTED:
            return {
              ...state,
              loading: true
            }
          case UPDATE_PLAYER_SUCCESSFUL: 
            return {
              ...state,
              loading: false,
              player: action.payload
            }
          case UPDATE_PLAYER_FAILED:
            return {
              ...state,
              loading: false,
              error: action.payload
            }
            case DELETE_PLAYER_STARTED:
            return {
              ...state,
              loading: true
            }
          case DELETE_PLAYER_SUCCESSFUL: 
            return {
              ...state,
              loading: false,
              deletedPlayer: action.payload
            }
          case DELETE_PLAYER_FAILED:
            return {
              ...state,
              loading: false,
              error: action.payload
            }
    }
      return state;
}