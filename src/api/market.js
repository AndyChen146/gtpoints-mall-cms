/**
 *   athor: andychen
 *   desc: 针对活动类的api
 */

import request from '@/util/request'

//积分夺宝列表
export function pointStoreList(params) {
    return request({
        url: '/api/admin.point_activity/getList',
        method: 'post',
        data: params
    })
}

//积分夺宝详情
export function pointStoreInfo(params) {
    return request({
        url: '/api/admin.point_activity/getInfo',
        method: 'post',
        data: params
    })
}

//积分夺宝新增、修改
export function setPointStore(params) {
    return request({
        url: '/api/admin.point_activity/setPoint',
        method: 'post',
        data: params
    })
}

// 积分夺宝 启用或禁用
export function setPointStoreStatus(params) {
    return request({
        url: '/api/admin.point_activity/setStatus',
        method: 'post',
        data: params
    })
}

// 积分夺宝商品 新增/修改
export function setPointStoreGoods(params) {
    return request({
        url: '/api/admin.point_activity_goods/setGoods',
        method: 'post',
        data: params
    })
}

//积分夺宝商品 列表
export function getPointStoreGoods(params) {
    return request({
        url: '/api/admin.point_activity_goods/getList',
        method: 'post',
        data: params
    })
}

//免费抢购 获取列表
export function getFreePanicList(params) {
    return request({
        url: '/api/admin.free_activity/getList',
        method: 'post',
        data: params
    })
}

//免费抢购 新增、编辑
export function setFreePanic(params) {
    return request({
        url: '/api/admin.free_activity/setFree',
        method: 'post',
        data: params
    })
}

//免费抢购 获取详情
export function getFreePanicInfo(params) {
    return request({
        url: '/api/admin.free_activity/getInfo',
        method: 'post',
        data: params
    })
}

//免费抢购 启⽤禁⽤
export function setFreePanicStatus(params) {
    return request({
        url: '/api/admin.free_activity/setStatus',
        method: 'post',
        data: params
    })
}

//免费抢购 商品 新增、编辑
export function setFreePanicGoods(params) {
    return request({
        url: '/api/admin.free_activity_goods/setGoods',
        method: 'post',
        data: params
    })
}

//免费抢购 商品 获取列表
export function getFreePanicGoods(params) {
    return request({
        url: '/api/admin.free_activity_goods/getList',
        method: 'post',
        data: params
    })
}