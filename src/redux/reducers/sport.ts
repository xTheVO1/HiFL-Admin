import {
    GET_SPORT_STARTED,
    GET_SPORT_SUCCESSFUL,
    GET_SPORT_FAILED
    } from "../actions/actionTypes";

    const  initialState = {
        sports: [],
        loading: false,
        error: {}
      }
      
      export const SportReducer = (state: SportState = initialState, action: any):SportState => {
          switch(action.type) {
            case  GET_SPORT_STARTED:
              return {
                ...state,
                loading: true
              }
            case GET_SPORT_SUCCESSFUL: 
              return {
                ...state,
                loading: false,
                sports: action.payload
              }
            case GET_SPORT_FAILED:
              return {
                ...state,
                loading: false,
                error: action.payload
              }
          }
            return state;
      }
           