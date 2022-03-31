import {
  GET_INSTITUTIONS_STARTED,
  GET_INSTITUTIONS_SUCCESSFUL,
  GET_INSTITUTIONS_FAILED
} from "../actions/actionTypes";

const  initialState = {
  institutions:[],
  institution:[],
  newInstitution: {},
  loading: false,
  error: null
}

export const instituteReducer = (state: InstitutionState = initialState, action: any):InstitutionState => {
    switch(action.type) {
      case  GET_INSTITUTIONS_STARTED:
        return {
          ...state,
          loading: true
        }
      case GET_INSTITUTIONS_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          institutions: action.payload
        }
      case GET_INSTITUTIONS_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
    }
      return state;
}
     