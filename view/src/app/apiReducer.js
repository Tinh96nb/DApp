import * as session from 'common/helpers/session'

const INCREMENT_LOADINGS = 'api/INCREMENT_LOADINGS'
const DECREMENT_LOADINGS = 'api/DECREMENT_LOADINGS'
const CATCH_API_ERROR = 'api/CATCH_API_ERROR'
const DELETE_API_ERROR = 'api/DELETE_API_ERROR'

export function requestAxios (
  axiosObj
) {
  return (dispatch) => {
    const startRequest = () => {
      dispatch({
        type: INCREMENT_LOADINGS
      })
    }

    const finishedRequest = () => {
      dispatch({
        type: DECREMENT_LOADINGS
      })
    }

    startRequest()

    return axiosObj
      .then((response) => {
        finishedRequest()
        return response.data
      })
      .catch((error) => {
        finishedRequest()
        return dispatch(createAxiosErrorAction(error))
      })
  }
}

function createAxiosErrorAction (error) {
  const response = error.response
  let payload = {}
  if (response) {
    const message = response.data.message

    payload = {
      status: response.status,
      messageCode: response.code ? response.code : response.status,
      message
    }
  } else {
    let message = 'Cannot connect network. Please check and try again.'
    if (error.message) {
      message += `[${error.message}]`
    }
    payload = {
      status: null,
      messageCode: null,
      message
    }
  }

  return {
    type: CATCH_API_ERROR,
    payload
  }
}

export function deleteAxiosError () {
  return (dispatch) => {
    dispatch({ type: DELETE_API_ERROR })
  }
}

const createEmptyXhrState = () => ({
  loadings: 0,
  error: null
})

export const apiReducer = (
  state = createEmptyXhrState(),
  action
) => {
  let loadings = state.loadings

  switch (action.type) {
    case INCREMENT_LOADINGS:
      loadings += 1
      return { ...state, loadings }
    case DECREMENT_LOADINGS:
      loadings = loadings > 0 ? loadings - 1 : 0
      return { ...state, loadings }
    case DELETE_API_ERROR:
      return { ...state, error: null }
    case CATCH_API_ERROR:
      if (action.payload.status === 401) {
        session.remove()
        window.location.href = '/auth'
        return state
      }
      return { ...state, error: action.payload }
  }
  return state
}
