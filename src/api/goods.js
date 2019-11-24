import request from '@/util/request'

// 商品新增、编辑
export function updataGoods(params) {
    return request({
        url: '/api/admin.goods_type/setType',
        method: 'post',
        data: params
    })
}

// 商品列表
export function getGoodsList(params) {
    return request({
        url: '/api/hub.goods_type/getList',
        method: 'post',
        data: params
    })
}

//商品详情
export function getGoodsInfo(params) {
    return request({
        url: '/api/hub.goods_type/getInfo',
        method: 'post',
        data: params
    })
}

//商品删除
export function delGoodsInfo(params) {
    return request({
        url: '/api/hub.goods_type/getInfo',
        method: 'post',
        data: params
    })
}