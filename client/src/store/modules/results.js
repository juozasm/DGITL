import { getPerson, getFacility, getExposure } from "../../api"

export const types = {
    REQ_RESULTS: "REQ_RESULTS",
    REQ_RESULTS_SUCCESS: "REQ_RESULTS_SUCCESS",
    REQ_RESULTS_FAILED: "REQ_RESULTS_FAILED"
}

export function getResults(input) {
    const request = () => ({ type: types.REQ_RESULTS })
    const failed = () => ({ type: types.REQ_RESULTS_FAILED })
    const success = payload => ({ type: types.REQ_RESULTS_SUCCESS, payload })

    return dispatch => {
        dispatch(request())
        getPerson(input)
            .then(res => {
                getFacility(res.firstName)
                    .then(res2 => {
                        getExposure(res.lastName)
                            .then(res3 => {
                                console.log(res3)
                                dispatch(success(`${res2.name}, ${res2.alias}`))
                            })
                            .catch(err => {
                                console.log(err)
                                dispatch(failed())
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        dispatch(failed())
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(failed())
            })
    }
}

const initialState = {
    data: null,
    requesting: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REQ_RESULTS:
            return {
                ...state,
                error: null,
                requesting: true
            }
        case types.REQ_RESULTS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                requesting: false
            }
        case types.REQ_RESULTS_FAILED:
            return {
                ...state,
                requesting: false,
                error: "Something went wrong..."
            }
        default:
            return state
    }
}
