import request from '@/util/request'

// 商品新增、编辑
export function updataGoods(params) {
    return request({
        url: '/api/admin.goods/setGoods',
        method: 'post',
        data: params
    })
}

// 商品列表
export function getGoodsList(params) {
    return request({
        url: '/api/hub.goods/getList',
        method: 'post',
        data: params
    })
}

//商品详情
export function getGoodsInfo(params) {
    return request({
        url: '/api/hub.goods/getInfo',
        method: 'post',
        data: params
    })
}

//商品删除
export function delGoodsInfo(params) {
    return request({
        url: '/api/hub.goods/del',
        method: 'post',
        data: params
    })
}


/***************商品评价***************************/
//评价列表
export function goodsAssessList(params) {
    return request({
        url: '/api/admin.evaluate/getList',
        method: 'post',
        data: params
    })
}
//隐藏显示评价
export function goodsAssessShow(params) {
    return request({
        url: '/api/admin.evaluate/setShow',
        method: 'post',
        data: params
    })
}
//回复评价
export function goodsAssessReply(params) {
    return request({
        url: '/api/admin.evaluate/reply',
        method: 'post',
        data: params
    })
}