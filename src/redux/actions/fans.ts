import { Dispatch } from "redux";
import { privateHttp } from "../../baseUrl";

import {
   GET_FANS_STARTED,
   GET_FANS_SUCCESSFUL,
   GET_FANS_FAILED
} from "./actionTypes";

const getFansStarted = () => ({
    type: GET_FANS_STARTED
})

const getFansSuccess = (data: IVolunteer) => ({
    type: GET_FANS_SUCCESSFUL,
    payload: data
})

const getFansFailed = (data: any) => ({
    type: GET_FANS_FAILED,
    payload: data
})


export const getFans = () => async (dispatch: Dispatch) => {
    try {
        dispatch(getFansStarted())
        const response = await privateHttp({
            method: "get",
            url: `/volunteers/fans/all`
        })
        const { data } = response;
        return dispatch(getFansSuccess(data.data))
    } catch (error: any) {
        return dispatch(getFansFailed(error.response))
    }
}

