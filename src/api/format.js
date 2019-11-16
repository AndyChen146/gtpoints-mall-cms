import request from '@/util/request'

//新增、编辑
export function updateFormat(params) {
    return request({
        url: '/api/admin.goods_spec/setSpec',
        method: 'post',
        data: params
    })
}

//获取列表
export function getFormatList(params) {
    return request({
        url: '/api/hub.goods_spec/getList',
        method: 'post',
        data: params
    })
}

//获取详情
export function getFormatInfo(params) {
    return request({
        url: '/api/hub.goods_spec/getInfo',
        method: 'post',
        data: params
    })
}