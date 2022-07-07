import { 
  LOGIN_FAILED, 
  LOGIN_START, 
  LOGIN_SUCCESSFUL,
  GET_USERS_START,
  GET_USERS_SUCCESSFUL,
  GET_USERS_FAILED,
  GET_USER_START,
  GET_USER_SUCCESSFUL,
  GET_USER_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESSFUL,
  UPDATE_USER_FAILED
} from "../actions/actionTypes";

const  initialState = {
  user:[],
  loading: false,
  error: {},
  users: [],
  updatedUsers: {},
  updateLoading: false,
  singleUser: {}
}

export const userReducer = (state: UserState = initialState, action: any):UserState => {
    switch(action.type) {
      case LOGIN_START:
        return {
          ...state,
          loading: true
        }
      case LOGIN_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          user: action.payload
        }
      case LOGIN_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case  GET_USERS_START:
          return {
            ...state,
            loading: true
          }
        case GET_USERS_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            users: action.payload
          }
        case GET_USERS_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
          case  GET_USER_START:
            return {
              ...state,
              loading: true
            }
          case GET_USER_SUCCESSFUL: 
            return {
              ...state,
              loading: false,
              singleUser: action.payload
            }
          case GET_USER_FAILED:
            return {
              ...state,
              loading: false,
              error: action.payload
            }
            case  UPDATE_USER_START:
              return {
                ...state,
                loading: true
              }
            case UPDATE_USER_SUCCESSFUL: 
              return {
                ...state,
                loading: false,
                singleUser: action.payload
              }
            case UPDATE_USER_FAILED:
              return {
                ...state,
                loading: false,
                error: action.payload
              }
    }
      return state;
}