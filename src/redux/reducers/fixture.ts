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
} from "../actions/actionTypes";

const initialState = {
    fixtures: [],
    fixture: {},
    updatedFixture: {},
    newFixture: {},
    loading: false,
    error: {}
}

export const FixtureReducer = (state: FixtureState = initialState, action: any): FixtureState => {
    switch (action.type) {
        case GET_FIXTURES_STARTED:
            return {
                ...state,
                loading: true
            }
        case GET_FIXTURES_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                fixtures: action.payload
            }
        case GET_FIXTURES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_FIXTURE_STARTED:
            return {
                ...state,
                loading: true
            }
        case GET_FIXTURE_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                fixture: action.payload
            }
        case GET_FIXTURE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case POST_FIXTURE_STARTED:
            return {
                ...state,
                loading: true
            }
        case POST_FIXTURE_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                newFixture: action.payload
            }
        case POST_FIXTURE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_FIXTURE_STARTED:
            return {
                ...state,
                loading: true
            }
        case UPDATE_FIXTURE_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                fixtures: action.payload
            }
        case UPDATE_FIXTURE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    }
    return state;
}