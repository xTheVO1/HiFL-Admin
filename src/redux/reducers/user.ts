import {
  
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

export const Reducer = (state: UserState = initialState, action: any):UserState => {
    switch(action.type) {
     
    }
      return state;
}
     