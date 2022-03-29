import { Dispatch } from "redux";
import {
    GET_INSTITUTIONS_STARTED,
    GET_INSTITUTIONS_SUCCESSFUL,
    GET_INSTITUTIONS_FAILED,
    GET_INSTITUTION_STARTED,
    GET_INSTITUTION_SUCCESSFUL,
    GET_INSTITUTION_FAILED,
    POST_INSTITUTION_STARTED,
    POST_INSTITUTION_SUCCESSFUL,
    POST_INSTITUTION_FAILED
} from "./actionTypes";
import {privateHttp} from "../../baseUrl";

const getInstitutionsStarted = () => ({
    type: GET_INSTITUTIONS_STARTED
  })

const getInstitutionsSuccess = (data: ITeam) => ({
    type: GET_INSTITUTIONS_SUCCESSFUL,
    payload: data
  })

const getInstitutionsFailed = (data: any) => ({
    type: GET_INSTITUTIONS_FAILED,
    payload: data
  })

  export const getInstitutions = () => async (dispatch: Dispatch) => {
   try {
       dispatch(getInstitutionsStarted())
       const response = await privateHttp({
         method: "get",
         url: `/institutions/`
       })
       const { data } = response;
       console.log(data)
       return dispatch(getInstitutionsSuccess(data.data))
     } catch (error: any) {
       return dispatch(getInstitutionsFailed(error.response))
     }
   }