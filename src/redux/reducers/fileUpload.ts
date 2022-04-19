import {
  POST_FILE_STARTED,
  POST_FILE_SUCCESSFUL,
  POST_FILE_FAILED
} from "../actions/actionTypes";



const  initialState = {
  file: {},
  fileLoading: false,
  error: {}
}

export const fileUploadReducer = (state: FileUploadState = initialState, action: any): FileUploadState => {
    switch(action.type) {
      case  POST_FILE_STARTED:
        return {
          ...state,
          fileLoading: true
        }
      case POST_FILE_SUCCESSFUL: 
        return {
          ...state,
          fileLoading: false,
          file: action.payload
        }
      case POST_FILE_FAILED:
        return {
          ...state,
          fileLoading: false,
          error: action.payload
        }
    }
      return state;
}
     