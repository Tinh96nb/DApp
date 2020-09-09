import * as request from 'api/request_api'
import { requestAxios } from 'app/apiReducer'

const FETCH_LIST_CATEGORY = 'admin/FETCH_LIST_CATEGORY'
const FETCH_DETAIL_CATEGORY = 'admin/FETCH_DETAIL_CATEGORY'
const CREATE_CATEGORY = 'admin/CREATE_CATEGORY'
const DELETE_CATEGORY = 'admin/DELETE_CATEGORY'

const FETCH_LIST_DOC = 'admin/FETCH_LIST_DOC'
const UPDATE_STATUS_DOC = 'admin/UPDATE_STATUS_DOC'

const FETCH_LIST_MEMBER = 'admin/FETCH_LIST_MEMBER'
const CREATE_MEMBER = 'admin/CREATE_MEMBER'
const UPDATE_STATUS_MEMBER = 'admin/UPDATE_STATUS_MEMBER'

export const fetchDocument = (params = {}) => {
  return (dispatch) => dispatch(requestAxios(request.getListDocument(params)))
    .then(response => {
      dispatch({
        type: FETCH_LIST_DOC,
        payload: { documents: response }
      })
    })
}
export const updateStatusDoc = (params = {}, cb = null) => {
  return (dispatch) => dispatch(requestAxios(request.adminUpdateStatusDocument(params)))
    .then(response => {
      dispatch(fetchDocument())
      return cb && cb(response)
    })
}

export const fetchListCategory = (params = {}) => {
  return (dispatch) => dispatch(requestAxios(request.getListCategory(params)))
    .then(response => {
      dispatch({
        type: FETCH_LIST_CATEGORY,
        payload: { categories: response }
      })
    })
}

export const createCategory = (params = {}, cb = null) => {
  return (dispatch, getState) => dispatch(requestAxios(request.createCategory(params)))
    .then(response => {
      const currentList = getState().admin.categories
      const newList = [...[response], ...currentList]
      dispatch({
        type: CREATE_CATEGORY,
        payload: { categories: newList }
      })
      return cb && cb(response)
    })
}

export const deleteCategory = (params = {}, cb = null) => {
  return (dispatch, getState) => dispatch(requestAxios(request.deleteCategoryById(params)))
    .then(response => {
      const currentList = getState().admin.categories
      const newList = currentList.filter((row) => row.id !== parseInt(response), 10)
      dispatch({
        type: DELETE_CATEGORY,
        payload: { categories: newList }
      })
      return cb && cb(response)
    })
}

export const updateCategory = (params = {}, cb = null) => {
  return (dispatch, getState) => dispatch(requestAxios(request.updateCategory(params)))
    .then(response => {
      const currentList = getState().admin.categories
      const index = currentList.findIndex((row) => row.id === response.id)
      currentList[index] = response
      dispatch({
        type: DELETE_CATEGORY,
        payload: { categories: currentList }
      })
      return cb && cb(response)
    })
}

export const fetchListMember = (params = {}) => {
  return (dispatch) => dispatch(requestAxios(request.getListMember({ role: 'member' })))
    .then(response => {
      dispatch({
        type: FETCH_LIST_MEMBER,
        payload: { members: response }
      })
    })
}

export const createMember = (params = {}, cb) => {
  return (dispatch, getState) => dispatch(requestAxios(request.createMember(params)))
    .then(response => {
      const currentList = getState().admin.members
      const newList = [...[response], ...currentList]
      dispatch({
        type: CREATE_MEMBER,
        payload: { members: newList }
      })
      return cb && cb(response)
    })
}

export const updateStatusMember = (params = {}, cb = null) => {
  return (dispatch) => dispatch(requestAxios(request.updateStatusMember(params)))
    .then(response => {
      dispatch(fetchListMember())
      return cb && cb(response)
    })
}

const initState = {
  documents: [],
  categories: [],
  members: []
}

export const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_LIST_CATEGORY:
    case FETCH_DETAIL_CATEGORY:
    case CREATE_CATEGORY:
    case DELETE_CATEGORY:
    case FETCH_LIST_DOC:
    case UPDATE_STATUS_DOC:
    case FETCH_LIST_MEMBER:
    case CREATE_MEMBER:
    case UPDATE_STATUS_MEMBER:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
