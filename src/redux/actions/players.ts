import { Dispatch } from "redux";
import {
    POST_PLAYER_FAILED,
  POST_PLAYER_STARTED,
  POST_PLAYER_SUCCESSFUL,  
} from "./actionTypes";
import {privateHttp, http} from "../../baseUrl";

const start = () => ({
    type: POST_PLAYER_STARTED
  })

const postPlayerSuccess = (data: ITeam) => ({
    type: POST_PLAYER_SUCCESSFUL,
    payload: data
  })

const postPlayerFailed = (data: any) => ({
    type: POST_PLAYER_FAILED,
    payload: data
  })

  export const createPlayers = (data: any) => async (dispatch: Dispatch) => {
      const {userData, playerData} = data;
      console.log(userData, 25)
    try {
        dispatch(start())
        const response = await http({
          method: "post",
          url: `/auth/register/`,
          data: userData
        })
        const { data } = response;
        playerData.User = data.data._id;
        console.log(playerData, 34)
            const playerResponse = await privateHttp({
               method: "post",
               url: `/players/player/register/`,
               data: playerData
             })
             console.log(playerResponse.data, 35)
            
             return dispatch(postPlayerSuccess(playerResponse.data))
        return response;
      } catch (error: any) {
        return dispatch(postPlayerFailed(error.response))
      }
    }