import request from '@/util/request'

//新增、编辑品牌
export function updateBrands(params) {
    return request({
        url: '/api/admin.brand/setBrand',
        method: 'post',
        data: params
    })
}

//查看品牌列表
export function getBrandsList(params) {
    return request({
        url: '/api/hub.brand/getList',
        method: 'post',
        data: params
    })
}

//获取品牌详情
export function getBrandsInfo(params) {
    return request({
        url: '/api/hub.brand/getInfo',
        method: 'post',
        data: params
    })
}