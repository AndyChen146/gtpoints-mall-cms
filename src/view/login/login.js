export default {
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (value == "") {
                callback(new Error("请输入正确的用户名"))
            } else {
                callback()
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能小于6位'))
            } else {
                callback()
            }
        };
        return {
            arrs: [1, 2, 3, 4, 5, 6],
            loginForm: {
                username: 'admin',
                password: 123456
            },
            loginRules: {
                username: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateUsername
                }],
                password: [{
                    required: true,
                    trigger: 'blur',
                    validator: validatePass
                }]
            },
            loading: false,
            pwdType: 'password'
        }
    },
    methods: {
        showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.$router.push('/home')
                } else {
                    return false
                }
            })


        }
    },

}