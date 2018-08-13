// import request from '@/common/js/request'

export const getCurrentUserName = () => {
  // return request.get('/users')
  return Promise.resolve({
    userName: 'zhang'
  })
}

export const getPermissionMenusByRoles = param => {
  // return request.post('/users', param)
  return Promise.resolve({
    getCurrentUserName: []
  })
}
