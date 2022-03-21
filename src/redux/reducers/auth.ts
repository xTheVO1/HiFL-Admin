import { 
  LOGIN_FAILED, 
  LOGIN_START, 
  LOGIN_SUCCESSFUL
} from "../actions/actionTypes";

interface IUser {
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

const  initialState = {
  user:[],
  loading: false,
  error: null
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
    }
      return state;
}