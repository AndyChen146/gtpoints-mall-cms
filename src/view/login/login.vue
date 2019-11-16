<template>
    <div class="login_wrap">
        <div class="login_bj">
            <!-- <img class="header_logo" src="@/assets/images/logo.png" /> -->
            <p class="header_title">广踏积分商城后台管理系统</p>
        </div>
        <div class="login_box">
            <div class="left_box">
                <div>
                    <img src="@/assets/images/login_mall1.png" />
                </div>
            </div>
            <div class="right_box">
                <el-form autocomplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
                    <el-form-item>
                        <p class="enter">登录后台入口</p>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input
                            name="username"
                            type="text"
                            v-model="loginForm.username"
                            autocomplete="off"
                            placeholder="请输入用户名"
                        >
                            <span slot="prefix">
                                <svg-icon icon-class="user" class="color-main"></svg-icon>
                            </span>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            name="password"
                            :type="pwdType"
                            @keyup.enter.native="handleLogin"
                            v-model="loginForm.password"
                            autocomplete="off"
                            placeholder="请输入密码"
                        >
                            <span slot="prefix">
                                <svg-icon icon-class="password" class="color-main"></svg-icon>
                            </span>
                            <span slot="suffix" @click="showPwd" style="cursor: pointer">
                                <svg-icon icon-class="eye" class="color-main"></svg-icon>
                            </span>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            style="width: 100%"
                            type="primary"
                            :loading="loading"
                            @click.native.prevent="handleLogin"
                        >登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import { loginBtn } from "@/api/login";
import hex_md5 from "js-md5";
export default {
    name: "login",
    data() {
        const validateUsername = (rule, value, callback) => {
            if (value == "") {
                callback(new Error("用户名不能为空"));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error("密码不能小于5位"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: "super",
                password: "admin"
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername
                    }
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePass
                    }
                ]
            },
            loading: false,
            pwdType: "password"
        };
    },
    methods: {
        showPwd() {
            if (this.pwdType === "password") {
                this.pwdType = "";
            } else {
                this.pwdType = "password";
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    let username = this.loginForm.username;
                    let password = hex_md5(this.loginForm.password);
                    this.loginSubmit(username, password);
                } else {
                    return false;
                }
            });
        },
        //ajax接口登录
        loginSubmit(username, password) {
            this.loading = true;
            this.$store
                .dispatch("Login", {
                    username: username,
                    password: password
                })
                .then(() => {
                    this.loading = false;
                    this.$router.push("/home");
                })
                .catch(() => {
                    this.loading = false;
                });
        }
    }
};
</script>
<style lang="scss" src="./login.scss" scoped></style>