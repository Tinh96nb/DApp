import * as request from 'api/request_api'
import { requestAxios } from 'app/apiReducer'

const FETCH_LIST_MEMBER = 'mem/FETCH_LIST_MEMBER'

export const fetchListMember = (params = {}) => {
  return (dispatch) => dispatch(requestAxios(request.getListMember(params)))
    .then(response => {
      dispatch({
        type: FETCH_LIST_MEMBER,
        payload: { list: response }
      })
    })
}

const initState = {
  list: []
}

export const memReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_LIST_MEMBER:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
