import {
  POST_FILE_STARTED,
  POST_FILE_SUCCESSFUL,
  POST_FILE_FAILED
} from "../actions/actionTypes";



const  initialState = {
  file: {},
  loading: false,
  error: {}
}

export const fileUploadReducer = (state: FileUploadState = initialState, action: any): FileUploadState => {
    switch(action.type) {
      case  POST_FILE_STARTED:
        return {
          ...state,
          loading: true
        }
      case POST_FILE_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          file: action.payload
        }
      case POST_FILE_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
    }
      return state;
}
     