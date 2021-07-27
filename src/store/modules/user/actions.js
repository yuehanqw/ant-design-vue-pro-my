import * as types from './mutation-types'
import { ACCESS_TOKEN, MULTI_ARR, USER_INFO } from './storage-types'
import { generatorDynamicRouter } from '@/router/generator-routers'
import { postAction } from '@/api/api'

export const SetToken = function({ commit }, data) {
  const { value, remember } = data
  if (remember) {
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(value))
  }
  commit(types.SET_TOKEN, value)
}
export const SetUserInfo = function({ commit }, data) {
  const { value, remember } = data
  if (remember) {
    localStorage.setItem(USER_INFO, JSON.stringify(value))
  }
  commit(types.SET_USER_INFO, value)
}
export const SetUserRouter = function({ commit }, data) {
  return new Promise(resolve => {
    generatorDynamicRouter().then(routers => {
      commit(types.SET_USER_ROUTERS, routers)
      resolve()
    })
  })
}

export const SetLoginout = function({ commit }, data) {
  return new Promise(resolve => {
    postAction('port/sys/logout').then(res => {
      SetToken({ commit }, { remember: true, value: '' })
      SetUserInfo({ commit }, { remember: true, value: {} })
      SetMultiArr({ commit }, { remember: true, value: [] })
      resolve()
    })
  })
}

export const SetMultiArr = function({ commit }, data) {
  const { value, remember } = data
  if (remember) {
    localStorage.setItem(MULTI_ARR, JSON.stringify(value))
  }
  commit(types.SET_MULTI_ARR, value)
}