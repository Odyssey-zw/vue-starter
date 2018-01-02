import request from '@/common/js/request'

export const getCurrentUserName = () => {
  return request.get('/users')
}

export const getPermissionMenusByRoles = param => {
  return request.post('/users', param)
}
