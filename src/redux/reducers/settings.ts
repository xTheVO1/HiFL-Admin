import {
    GET_SETTING_STARTED,
    GET_SETTING_SUCCESSFUL,
    GET_SETTING_FAILED,
    POST_SETTING_STARTED,
    POST_SETTING_SUCCESSFUL,
    POST_SETTING_FAILED,
    UPDATE_SETTING_STARTED,
    UPDATE_SETTING_SUCCESSFUL,
    UPDATE_SETTING_FAILED,
    SET_SELECTED_SETTING,
    GET_SET_SELECTED_SETTING
} from "../actions/actionTypes";
import { selectedItem } from "../actions/settings";



const  initialState = {
    settings: [],
    loading: false,
    postLoading:false,
    newSetting: false,
    updatedSetting: false,
    error:{},
    selectedItem: {},
    getItem: {}
}

export const settingsReducer = (state: SettingState = initialState, action: any):SettingState => {
    switch(action.type) {
      case  GET_SETTING_STARTED:
        return {
          ...state,
          loading: true
        }
      case GET_SETTING_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          settings: action.payload
        }
      case GET_SETTING_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case  POST_SETTING_STARTED:
          return {
            ...state,
            loading: true
          }
        case POST_SETTING_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            newSetting: action.payload
          }
        case POST_SETTING_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
          case  UPDATE_SETTING_STARTED:
            return {
              ...state,
              loading: true
            }
          case UPDATE_SETTING_SUCCESSFUL: 
            return {
              ...state,
              loading: false,
              updatedSetting: action.payload
            }
          case UPDATE_SETTING_FAILED:
            return {
              ...state,
              loading: false,
              error: action.payload
            }
            case SET_SELECTED_SETTING:
            return {
              ...state,
              loading: false,
              selectedItem: action.payload
            }
            case GET_SET_SELECTED_SETTING:
            return {
              ...state,
              loading: false,
              getItem: action.payload
            }
        }
      return state;
}
     