import Cookies from 'js-cookie'

function getSessionDomain () {
  return window.location.hostname.replace(/.+?\./, '.')
}

export const has = () => {
  return !!Cookies.get('ETH-PDT')
}

export const set = (parameter) => {
  Cookies.set('ETH-PDT', parameter, { domain: getSessionDomain(), expires: 30 })
}

export const get = () => {
  return Cookies.get('ETH-PDT')
}

export const remove = () => {
  Cookies.remove('ETH-PDT', { domain: getSessionDomain() })
  Cookies.remove('ETH-PDT')
}
