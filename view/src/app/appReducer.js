import * as request from 'api/request_api'
import { requestAxios } from 'app/apiReducer'

const FETCH_USER_ME = 'user/FETCH_USER_ME'
const FETCH_CATEGORY = 'user/FETCH_CATEGORY'

const initialState = {
  authChecked: false,
  me: null
}

export function postLogin (parameters, cb) {
  return (dispatch) => dispatch(requestAxios(request.postLogin(parameters)))
    .then((response) => {
      return cb(response)
    })
}

export function getUserMe () {
  return (dispatch) => dispatch(requestAxios(request.postUserMe()))
    .then((response) => {
      dispatch({
        type: FETCH_USER_ME,
        payload: { me: response.profile, authChecked: true }
      })
    })
}

export const appReducer = (
  state = initialState,
  action
) => {
  const { type, payload = {} } = action
  switch (type) {
    case FETCH_USER_ME:
    case FETCH_CATEGORY:
      return { ...state, ...payload }
    default:
      return state
  }
}
