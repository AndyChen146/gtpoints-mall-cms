import request from '@/util/request'

//图片上传
export function uploadImage(params) {
    return request({
        url: '/api/hub.upload/picture',
        method: 'post',
        data: params
    })
}