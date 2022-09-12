import axios from "axios";
import config from './config'

// const baseUrl = process.env.VUE_API_PREFIX;
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;
const _axios = axios.create({
    baseURL: baseUrl,
    timeout: 10000
});
// 添加请求拦截器
_axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
_axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default _axios;

// import request form '@/api/request'
// import { get, post ,put, del } form '@/api/request'
// request.get(url, {
//     params:
// })
// request({
//     url: "/hotel/jdgl-hotel-build-info/getHotelBuildByHotelId",
//     method: "get",
//     params
//   });
// get(url, option)

export const get = (url, option = {}) => {
    return _axios.get(url, {
        params: option
    })
}

export const post = (url, option = {}) => {
    return _axios.post(url,{
        data: option
    })
}

export const put = (url, option = {}) => {
    return _axios.put(url,{
        data: option
    })
}

export const del = (url, option = {}) => {
    return _axios.delete(url,{
        params: option
    })
}