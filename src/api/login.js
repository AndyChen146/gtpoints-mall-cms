import request from '@/util/request'

export function loginBtn(params) {
    return request({
        url: '/api/admin.passport/login',
        method: 'post',
        data: params
    })
}
