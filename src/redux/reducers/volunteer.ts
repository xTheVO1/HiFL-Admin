import {
    GET_VOLUNTEERS_STARTED,
    GET_VOLUNTEERS_SUCCESSFUL,
    GET_VOLUNTEERS_FAILED,
    GET_VOLUNTEER_STARTED,
    GET_VOLUNTEER_SUCCESSFUL,
    GET_VOLUNTEER_FAILED,
    UPDATE_VOLUNTEER_STARTED,
    UPDATE_VOLUNTEER_SUCCESSFUL,
    UPDATE_VOLUNTEER_FAILED
} from "../actions/actionTypes";

const initialState = {
    volunteers: [],
    volunteer: {},
    updatedVolunteer: {},
    newVolunteer: {},
    loading: false,
    error: {},
    updateLoading:false,
}

export const volunteerReducer = (state: VolunteerState = initialState, action: any):VolunteerState => {
    switch(action.type) {
      case  GET_VOLUNTEERS_STARTED:
        return {
          ...state,
          loading: true
        }
      case GET_VOLUNTEERS_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          volunteers: action.payload
        }
      case GET_VOLUNTEERS_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case  GET_VOLUNTEER_STARTED:
          return {
            ...state,
            loading: true
          }
        case GET_VOLUNTEER_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            volunteer: action.payload
          }
        case GET_VOLUNTEER_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
          case  UPDATE_VOLUNTEER_STARTED:
            return {
              ...state,
              updateLoading: true
            }
          case UPDATE_VOLUNTEER_SUCCESSFUL: 
            return {
              ...state,
              updateLoading: false,
              updatedVolunteer: action.payload
            }
          case UPDATE_VOLUNTEER_FAILED:
            return {
              ...state,
              updateLoading: false,
              error: action.payload
            }
    }
      return state;
}
  