// import { baseURL } from './request'

export const throttle = (
  obj = {
    thimer: 0
  },
  cb,
  date = 200
) => {
  if (!obj.thimer) {
    obj.thimer = 0
  }
  clearTimeout(obj.thimer)
  obj.thimer = setTimeout(() => {
    cb()
  }, date)
}

export const log = (message, ...optionalParams) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, optionalParams)
  }
}
