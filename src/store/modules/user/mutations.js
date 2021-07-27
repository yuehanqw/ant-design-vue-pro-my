// 定义修改操作
import * as types from './mutation-types'
import { constantRouterMap } from '@/config/router.config'
import { SET_MULTI_ARR } from './mutation-types'

const mutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.SET_USER_INFO]: (state, info) => {
    state.userInfo = info
  },
  [types.SET_USER_ROUTERS]: (state, routers) => {
    state.userRouter = constantRouterMap.concat(routers)
  },
  [types.SET_MULTI_ARR]: (state, info) => {
    state.multiArr = info
  }
}
export default mutations
