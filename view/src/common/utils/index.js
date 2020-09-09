import { DateTime } from 'luxon'
DateTime.local()

export function convertTimeStampToString (timestamp) {
  const date = DateTime.fromISO(timestamp)
  return date.toFormat('yyyy-LL-dd T')
}

export function timeStampToString (timestamp) {
  const date = DateTime.fromSeconds(timestamp)
  return date.toFormat('yyyy-LL-dd T')
}
export const encodeQueryData = (data) => {
  const ret = []
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      ret.push(`${key}=${data[key]}`)
    }
  }
  return ret.join('&')
}

export const getUrlParams = () => {
  const search = window.location.search
  if (!search.trim().length) return {}
  const hashes = search.slice(search.indexOf('?') + 1).split('&')
  const params = {}
  hashes.map((hash) => {
    const [ key, val ] = hash.split('=')
    params[key] = decodeURIComponent(val)
  })

  return params
}
