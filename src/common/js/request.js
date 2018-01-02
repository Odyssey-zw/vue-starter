import axios from 'axios'

export let baseURL

if (process.env.NODE_ENV !== 'production') {
  baseURL = `${location.origin}/api`
} else {
  baseURL = `${location.origin}`
}

class Request {
  constructor() {
    this._axios = axios.create({
      baseURL
    })
  }

  /**
   * 设置请求头
   * @param {Object} headers 请求头
   */
  setHeaders(headers) {
    Object.keys(headers).forEach(key => {
      this._axios.defaults.headers[key] = headers[key]
    })
  }

  /**
   * 发送get请求
   * @param {String} url 地址
   * @param {Object} query 查询参数
   * @return json 数据
   */
  get(url, query = {}) {
    return this._request('get')(url, query)
  }

  /**
   * 发送post请求
   * @param {String} url 地址
   * @param {Object} body 请求主体
   * @return json 数据
   */
  post(url, body = {}) {
    return this._request('post')(url, body)
  }

  _request(method) {
    return (url, data) => {
      let config = {
        url,
        method
      }
      if (method === 'get') {
        config.params = { ...data }
        if (process.env.NODE_ENV !== 'production') {
          config.params = { ...data, userName: 'admin', roles: 'admin' }
        }
      } else {
        config.data = { ...data }
        if (process.env.NODE_ENV !== 'production') {
          config.data = { ...data, userName: 'admin', roles: 'admin' }
        }
      }

      return new Promise((resolve, reject) => {
        this._axios
          .request(config)
          .then(response => {
            if (response.status >= 200 && response.status < 400) {
              resolve(response.data)
            } else {
              // reject()
            }
          })
          .catch(err => reject(err))
      })
    }
  }
}

export default new Request()
