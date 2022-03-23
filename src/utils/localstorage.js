

export const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem("state");
      if (serializedState === null) {
        return undefined;
      }
      let state = JSON.parse(serializedState)
      /*
      let token = JSON.parse(serializedState).AuthReducer.access_token;
      jwt.verify(token,jwt_token,function (err,decoded) {
        if (err) {
        }
      })
      */
      return state;
    } catch (err) {
      return undefined;
    }
  };


  export const saveState = state => {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem("state", serializedState);
     
    } catch (err) {
      //ignoring write erros
    }
  };

  export const RemoveState = state => {
    try {
      sessionStorage.removeItem('state')
      
    } catch (err) {
      //ignoring write erros
    }
  };