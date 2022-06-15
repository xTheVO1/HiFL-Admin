import { Dispatch } from "redux";
import { privateHttp } from "../../baseUrl";
import { ErrorPopUp, SuccessPopUp } from "../../utils/toastify";

import {
    GET_FIXTURE_STARTED,
    GET_FIXTURE_SUCCESSFUL,
    GET_FIXTURE_FAILED,
    GET_FIXTURES_STARTED,
    GET_FIXTURES_SUCCESSFUL,
    GET_FIXTURES_FAILED,
    POST_FIXTURE_STARTED,
    POST_FIXTURE_SUCCESSFUL,
    POST_FIXTURE_FAILED,
    UPDATE_FIXTURE_STARTED,
    UPDATE_FIXTURE_SUCCESSFUL,
    UPDATE_FIXTURE_FAILED
} from "./actionTypes";

const getFixturesStarted = () => ({
    type: GET_FIXTURES_STARTED
})

const getFixturesSuccess = (data: IFixture) => ({
    type: GET_FIXTURES_SUCCESSFUL,
    payload: data
})

const getFixturesFailed = (data: any) => ({
    type: GET_FIXTURES_FAILED,
    payload: data
});

const getFixtureStarted = () => ({
    type: GET_FIXTURE_STARTED
})

const getFixtureSuccess = (data: IFixture) => ({
    type: GET_FIXTURE_SUCCESSFUL,
    payload: data
})

const getFixtureFailed = (data: any) => ({
    type: GET_FIXTURE_FAILED,
    payload: data
})

const postFixtureStarted = () => ({
    type: POST_FIXTURE_STARTED
})

const postFixtureSuccess = (data: IFixture) => ({
    type: POST_FIXTURE_SUCCESSFUL,
    payload: data
})

const postFixtureFailed = (data: any) => ({
    type: POST_FIXTURE_FAILED,
    payload: data
})

const updateFixtureStarted = () => ({
    type: UPDATE_FIXTURE_STARTED
})

const updateFixtureSuccess = (data: IFixture) => ({
    type: UPDATE_FIXTURE_SUCCESSFUL,
    payload: data
})

const updateFixtureFailed = (data: any) => ({
    type: UPDATE_FIXTURE_FAILED,
    payload: data
});

export const getFixtures = (id: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(getFixturesStarted())
        const response = await privateHttp({
            method: "get",
            url: `/leagues/season/fixtures/?League=${id}`
        })
        const { data } = response;
        return dispatch(getFixturesSuccess(data.data))
    } catch (error: any) {
        return dispatch(getFixturesFailed(error.response))
    }
}

export const getFixture = (id: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(getFixtureStarted())
        const response = await privateHttp({
            method: "get",
            url: `/leagues/?Season=${id}`
        })
        const { data } = response;
        return dispatch(getFixtureSuccess(data.data))
    } catch (error: any) {
        return dispatch(getFixtureFailed(error.response))
    }
}

export const postFixture = (payload: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(postFixtureStarted())
        const response = await privateHttp({
            method: "post",
            url: `/leagues/create/`,
            data: payload
        })
        const { data } = response;
        SuccessPopUp("League Successfully Created")
        return dispatch(postFixtureSuccess(data))
    } catch (error: any) {
        ErrorPopUp(error.response.data.message)
        return dispatch(postFixtureFailed(error.response))
    }
}

export const updateFixture = (payload: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(updateFixtureStarted())
        const response = await privateHttp({
            method: "patch",
            url: `/leagues/league/update/`,
            data: payload
        })
        const { data } = response;
        SuccessPopUp("League Successfully Updated")
        return dispatch(updateFixtureSuccess(data))
    } catch (error: any) {
        ErrorPopUp(error.response.data.message)
        return dispatch(updateFixtureFailed(error.response))
    }
}