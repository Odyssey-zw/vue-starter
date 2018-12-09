// import { baseURL } from './request'

// 函数节流
export const throttle = (
  obj = {
    timer: 0
  },
  cb,
  duration = 200
) => {
  if (!obj.timer) {
    obj.timer = 0
  }
  clearTimeout(obj.timer)
  obj.timer = setTimeout(() => {
    cb()
  }, duration)
}

// 暂停几秒，模拟网速慢的情况用
export const sleep = duration => {
  return new Promise(resolve => {
    setInterval(() => resolve(), duration)
  })
}
