

export const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem("state");
      if (serializedState === null) {
        return undefined;
      }
      let state = JSON.parse(serializedState)
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