import axios from 'axios'
import * as qs from 'qs'
import { assign, isEmpty } from 'lodash'
import { has, get } from 'common/helpers/session'

export const getDomain = process.env.API_ORIGIN || 'http://localhost:3000'

export const getConfig = parameters => {
  return parameters.$config ? parameters.$config : {}
}

export const request = (
  method,
  url,
  queryParameters,
  jsonBody,
  form,
  config
) => {
  method = method.toLowerCase()
  let keys = Object.keys(queryParameters)
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParameters)
  }

  const headers = {}
  if (method !== 'GET') {
    headers['content-type'] = 'application/x-www-form-urlencoded'
  }
  if (has()) {
    const userToken = get()
    headers.Authorization = `Bearer ${userToken}`
  }

  const defaultConfig = {
    method: method,
    responseType: 'json',
    withCredentials: false,
    headers
  }

  let mergedConfig
  if (isEmpty(jsonBody) && isEmpty(form)) {
    mergedConfig = assign(defaultConfig, config)
  } else if (!isEmpty(jsonBody)) {
    mergedConfig = assign(
      {
        data: jsonBody
      },
      defaultConfig,
      config
    )
  } else {
    /* For form field POST, PUT */
    mergedConfig = assign(
      {
        data: qs.stringify(form)
      },
      defaultConfig,
      config
    )
  }

  return axios(queryUrl, mergedConfig)
}

function mergeQueryParams (parameters, queryParameters) {
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      let parameter = parameters.$queryParameters[parameterName]
      queryParameters[parameterName] = parameter
    })
  }
  return queryParameters
}

export const postLogin = function (parameters = {}) {
  let path = '/login'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['address'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: address'))
  }
  if (parameters['address'] !== undefined) {
    form['address'] = parameters['address']
  }

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'POST',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const postUserMe = function (parameters = {}) {
  let path = '/members/me'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'POST',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const getListDocument = function (parameters = {}) {
  let path = '/documents'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters['category_id'] !== undefined) {
    queryParameters['category_id'] = parameters['category_id']
  }
  if (parameters['owner'] !== undefined) {
    queryParameters['owner'] = parameters['owner']
  }

  if (parameters['status'] !== undefined) {
    queryParameters['status'] = parameters['status']
  }

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'GET',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const getDocumentById = function (parameters = {}) {
  let path = '/documents/{id}'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  if (parameters['id'] !== undefined) {
    form['id'] = parameters['id']
  }
  path = path.replace('{id}', parameters['id'])

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'GET',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const deleteDocumentById = function (parameters = {}) {
  let path = '/documents/{id}'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  if (parameters['id'] !== undefined) {
    form['id'] = parameters['id']
  }
  path = path.replace('{id}', parameters['id'])

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'DELETE',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const updateStatusDocument = function (parameters = {}) {
  let path = '/documents/change-status'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  if (parameters['id'] !== undefined) {
    form['id'] = parameters['id']
  }
  if (parameters['status'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: status'))
  }
  if (parameters['status'] !== undefined) {
    form['status'] = parameters['status']
  }

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'POST',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const crateDocument = function (parameters = {}) {
  let path = '/documents'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['file_content'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: file_content'))
  }
  if (parameters['file_content'] !== undefined) {
    form['file_content'] = parameters['file_content']
  }
  if (parameters['name'] !== undefined) {
    form['name'] = parameters['name']
  }
  if (parameters['category'] !== undefined) {
    form['category'] = parameters['category']
  }
  if (parameters['size'] !== undefined) {
    form['size'] = parameters['size']
  }
  if (parameters['description'] !== undefined) {
    form['description'] = parameters['description']
  }

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'POST',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const updateDocument = function (parameters = {}) {
  let path = '/documents/{id}'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  if (parameters['id'] !== undefined) {
    form['id'] = parameters['id']
  }
  if (parameters['name'] !== undefined) {
    form['name'] = parameters['name']
  }
  if (parameters['file_content'] !== undefined) {
    form['file_content'] = parameters['file_content']
  }
  if (parameters['category_id'] !== undefined) {
    form['category'] = parameters['category_id']
  }
  if (parameters['size'] !== undefined) {
    form['size'] = parameters['size']
  }
  if (parameters['description'] !== undefined) {
    form['description'] = parameters['description']
  }

  path = path.replace('{id}', parameters['id'])

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'PUT',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const getListCategory = function (parameters = {}) {
  let path = '/categories'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'GET',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}
export const deleteCategoryById = function (parameters = {}) {
  let path = '/admin/categories/{id}'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  if (parameters['id'] !== undefined) {
    form['id'] = parameters['id']
  }
  path = path.replace('{id}', parameters['id'])

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'DELETE',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const createCategory = function (parameters = {}) {
  let path = '/admin/categories'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['name'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: name'))
  }
  if (parameters['name'] !== undefined) {
    form['name'] = parameters['name']
  }

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'POST',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const updateCategory = function (parameters = {}) {
  let path = '/admin/categories/{id}'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  if (parameters['id'] !== undefined) {
    form['id'] = parameters['id']
  }
  if (parameters['name'] !== undefined) {
    form['name'] = parameters['name']
  }

  path = path.replace('{id}', parameters['id'])

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'PUT',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const getListMember = function (parameters = {}) {
  let path = '/members'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['role'] !== undefined) {
    queryParameters['role'] = parameters['role']
  }

  if (parameters['status'] !== undefined) {
    queryParameters['status'] = parameters['status']
  }

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'GET',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const adminUpdateStatusDocument = function (parameters = {}) {
  let path = '/admin/document/change-status'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  if (parameters['id'] !== undefined) {
    form['id'] = parameters['id']
  }
  if (parameters['status'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: status'))
  }
  if (parameters['status'] !== undefined) {
    form['status'] = parameters['status']
  }

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'POST',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const createMember = function (parameters = {}) {
  let path = '/admin/member'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['amount'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: amount'))
  }
  if (parameters['amount'] !== undefined) {
    form['amount'] = parameters['amount']
  }

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'POST',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const updateStatusMember = function (parameters = {}) {
  let path = '/admin/member/change-status'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  if (parameters['id'] !== undefined) {
    form['id'] = parameters['id']
  }

  if (parameters['status'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: status'))
  }
  if (parameters['status'] !== undefined) {
    form['status'] = parameters['status']
  }

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'POST',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const getSumary = function (parameters = {}) {
  let path = '/sumary'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'GET',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}

export const getBlockchain = function (parameters = {}) {
  let path = '/blockchain'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'GET',
    getDomain + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  )
}
