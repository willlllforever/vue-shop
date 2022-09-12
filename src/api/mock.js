import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import UserApi from './mockServeData/user'

Mock.mock('/home/getData',homeApi.getStaticalData)
Mock.mock(/user\/add/,'post', UserApi.createUser)
Mock.mock(/user\/edit/,'post', UserApi.updateUser)

Mock.mock(/user\/getUser/,'get', UserApi.getUserList)
Mock.mock(/user\/del/,'post', UserApi.deleteUser)