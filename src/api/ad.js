import request from '@/util/request'

//广告位 新增、编辑
export function updataAdTypeInfo(params) {
    return request({
        url: '/api/admin.ad/setPos',
        method: 'post',
        data: params
    })
}

//广告位 列表
export function getAdTypeList(params) {
    return request({
        url: '/api/hub.ad/getPosList',
        method: 'post',
        data: params
    })
}

//广告位 详情
export function getAdTypeInfo(params) {
    return request({
        url: '/api/hub.ad/getPosInfo',
        method: 'post',
        data: params
    })
}

//广告位 删除
export function delAdTypeList(params) {
    return request({
        url: '/api/admin.ad/delPos',
        method: 'post',
        data: params
    })
}

//广告 列表
export function getAdList(params) {
    return request({
        url: '/api/hub.ad/getList',
        method: 'post',
        data: params
    })
}

// 广告 详情
export function getAdInfo(params) {
    return request({
        url: '/api/hub.ad/getInfo',
        method: 'post',
        data: params
    })
}

// 广告 新增、编辑
export function updataAdInfo(params) {
    return request({
        url: '/api/admin.ad/setAd',
        method: 'post',
        data: params
    })
}

//广告 删除
export function delAdInfo(params) {
    return request({
        url: '/api/admin.ad/del',
        method: 'post',
        data: params
    })
}