import request from '@/util/request'

//新增、编辑分类
export function updateCateInfo(params) {
    return request({
        url: '/api/admin.category/setCate',
        method: 'post',
        data: params
    })
}

//获取分类列表
export function getCateList(params) {
    return request({
        url: '/api/hub.category/getList',
        method: 'get',
        params
    })
}

//获取分类详情
export function getCateInfo(params) {
    return request({
        url: '/api/hub.category/getInfo',
        method: 'post',
        data: params
    })
}