/**
 *   autor: andy
 *   desc: 接口请求 封装
 */

import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/util/auth'

const vaxios = axios.create({
    baseURL: '',  //api的请求地址
    time: 15000,  //请求超时时间
})

//request 拦截器，判断vuex是否有token
vaxios.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['x-token'] = getToken()
        config.headers['Content-Type'] = 'application/json'
    }
    return config;
}, error => {
    console.log(error)
    Promise.reject(error)
})

//response 拦截器
vaxios.interceptors.response.use(response => {
    const res = response.data;
    if (res.code != 0) {
        Message({
            message: res.msg,
            type: 'error',
            duration: 2 * 1000
        })
        // 判断是否未登录
        if (res.code === 401) {
            // 跳转到登录页
            tore.dispatch('FedLogOut').then(() => {
                this.$router.push("/login");
            })
        }
        return Promise.reject('error')
    } else {
        return response.data
    }
}, error => {
    Message({
        message: error.msg,
        type: 'error',
        duration: 2 * 1000
    })
    return Promise.reject(error)
})

export default vaxios;
