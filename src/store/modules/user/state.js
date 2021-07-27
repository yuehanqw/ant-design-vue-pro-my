import { ACCESS_TOKEN, MULTI_ARR, USER_INFO } from './storage-types'
import { constantRouterMap } from '@/config/router.config'

const state = {
  token: JSON.parse(localStorage.getItem(ACCESS_TOKEN)) || '',
  userInfo: JSON.parse(localStorage.getItem(USER_INFO)) || {},
  routers: constantRouterMap,
  userRouter: [],
  multiArr: JSON.parse(localStorage.getItem(MULTI_ARR)) || []
}
export default state
