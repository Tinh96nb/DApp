import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-toastify/dist/ReactToastify.css'
import 'css/main.css'

import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'

import App from './app/app'

const middleware = applyMiddleware(thunk)
const store = createStore(rootReducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
