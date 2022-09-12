import axios from "axios"
export const getMenu = (params) => {
    return axios.post('/permission/getMenu',params)
}

export const getData = () => {
    return axios.get('/home/getData')
}

export const getUser = (params) => {
    return axios.get('/user/getUser', { params })
}