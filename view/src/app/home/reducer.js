import * as request from 'api/request_api'
import { requestAxios } from 'app/apiReducer'

const SUMARY = 'home/SUMARY'
const BLOCKCHAIN = 'home/BLOCKCHAIN'

export const getSumary = () => {
  return (dispatch) => dispatch(requestAxios(request.getSumary()))
    .then(response => {
      dispatch({
        type: SUMARY,
        payload: { sumary: response }
      })
    })
}

export const getBlockchain = () => {
  return (dispatch) => dispatch(requestAxios(request.getBlockchain()))
    .then(response => {
      dispatch({
        type: BLOCKCHAIN,
        payload: { blocks: response.blocks, transactions: response.transactions }
      })
    })
}

const initState = {
  sumary: null,
  blocks: [],
  transactions: []
}

export const homeReducer = (state = initState, action) => {
  switch (action.type) {
    case SUMARY:
    case BLOCKCHAIN:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
