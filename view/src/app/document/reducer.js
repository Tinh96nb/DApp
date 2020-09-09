import * as request from 'api/request_api'
import { requestAxios } from 'app/apiReducer'

const FETCH_LIST_DOC = 'doc/FETCH_LIST_DOC'
const FETCH_DETAIL_DOC = 'doc/FETCH_DETAIL_DOC'
const CREATE_DOC = 'doc/CREATE_DOC'
const DELETE_DOC = 'doc/DELETE_DOC'

export const fetchDocument = (params = {}) => {
  return (dispatch) => dispatch(requestAxios(request.getListDocument(params)))
    .then(response => {
      dispatch({
        type: FETCH_LIST_DOC,
        payload: { list: response, query: params || null }
      })
    })
}

export const fetchDocumentById = (params = {}) => {
  return (dispatch) => dispatch(requestAxios(request.getDocumentById(params)))
    .then(response => {
      dispatch({
        type: FETCH_DETAIL_DOC,
        payload: { one: response }
      })
    })
}

export const crateDocument = (params = {}, cb = null) => {
  return (dispatch, getState) => dispatch(requestAxios(request.crateDocument(params)))
    .then(response => {
      if (response.payload) return null
      const currentList = getState().doc.list
      const newList = [...[response], ...currentList]
      dispatch({
        type: CREATE_DOC,
        payload: { list: newList }
      })
      return cb && cb(response)
    })
}

export const deleteDocument = (params = {}, cb = null) => {
  return (dispatch, getState) => dispatch(requestAxios(request.deleteDocumentById(params)))
    .then(response => {
      if (response.payload) return null
      const currentList = getState().doc.list
      const newList = currentList.filter((row) => row.id !== response)
      dispatch({
        type: DELETE_DOC,
        payload: { list: newList }
      })
      return cb && cb(response)
    })
}

export const updateDocument = (params = {}, cb = null) => {
  return (dispatch, getState) => dispatch(requestAxios(request.updateDocument(params)))
    .then(response => {
      if (response.payload) return null
      const currentList = getState().doc.list
      const index = currentList.findIndex((row) => row.id === response.id)
      currentList[index] = response
      dispatch({
        type: DELETE_DOC,
        payload: { list: currentList }
      })
      return cb && cb(response)
    })
}

const initState = {
  list: [],
  one: {},
  query: null
}

export const docReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_LIST_DOC:
    case FETCH_DETAIL_DOC:
    case CREATE_DOC:
    case DELETE_DOC:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
