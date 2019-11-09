const user = {
    state: {
        token: '',
        name: '',
        avater: '',
        roles: []
    },
    mutations: {
        SET_TOKEN: (state, token)=>{
            state.token = token
        },
        SET_NAME: (state, name)=> {
            state.name = name
        },
        SET_AVATER: (state, avater)=> {
            state.avater = avater
        },
        SET_ROLES: (state, roles)=>{
            state.roles = roles
        }
    },
    actions: {
        //登录
        Login({commit}, userinfo) {

        },
        //获取用户信息
        GetInfo({commit, state}) {

        },
        //退出
        LogOut({commit, state}) {

        },
        FedLogOut({commit}) {

        }
    }
}
export default user
