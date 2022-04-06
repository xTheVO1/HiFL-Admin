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

  const getInstitutionStarted = () => ({
    type: GET_INSTITUTION_STARTED
  })

const getInstitutionSuccess = (data: ITeam) => ({
    type: GET_INSTITUTION_SUCCESSFUL,
    payload: data
  })

const getInstitutionFailed = (data: any) => ({
    type: GET_INSTITUTION_FAILED,
    payload: data
  })

const postInstitutionStarted = () => ({
  type: POST_INSTITUTION_STARTED
})
  
const postInstitutionSuccess = (response: IInstitution) => ({
    type: POST_INSTITUTION_SUCCESSFUL,
    payload: response
  })
  
const postInstitutionFailed = (data: any) => ({
    type: POST_INSTITUTION_FAILED,
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
       return dispatch(getInstitutionsSuccess(data.data))
     } catch (error: any) {
       return dispatch(getInstitutionsFailed(error.response))
     }
  }

export const getInstitution = () => async (dispatch: Dispatch) => {
    try {
        dispatch(getInstitutionStarted())
        const response = await privateHttp({
          method: "get",
          url: `/institutions/institution/`
        })
        const { data } = response;
        return dispatch(getInstitutionSuccess(data.data))
      } catch (error: any) {
        return dispatch(getInstitutionFailed(error.response))
      }
  }

export const postInstitution = (payload: any) => async (dispatch: Dispatch) => {
 const {instituteData, navigate} = payload;
 console.log(instituteData)
  try {
      dispatch(postInstitutionStarted())
      const response = await privateHttp({
        method: "post",
        url: `/institutions/create/`,
        data: instituteData
      })
      const { data } = response;
      navigate("/institutions")
      return dispatch(postInstitutionSuccess(data))
    } catch (error: any) {
      return dispatch(postInstitutionFailed(error.response))
    }
}