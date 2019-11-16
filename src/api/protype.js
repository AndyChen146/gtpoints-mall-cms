import request from '@/util/request'

//新增、编辑
export function updateProtype(params) {
    return request({
        url: '/api/admin.goods_type/setType',
        method: 'post',
        data: params
    })
}

//获取列表
export function getProtypeList(params) {
    return request({
        url: '/api/hub.goods_type/getList',
        method: 'post',
        data: params
    })
}

//获取详情
export function getProtypeInfo(params) {
    return request({
        url: '/api/hub.goods_type/getInfo',
        method: 'post',
        data: params
    })
}