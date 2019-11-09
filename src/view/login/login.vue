<template>
    <div class="login_wrap">
        <div class="login_bj">
            <!-- <img class="header_logo" src="@/assets/images/logo.png" /> -->
            <p class="header_title">商城后台管理系统</p>
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
                            autocomplete="on"
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
                            autocomplete="on"
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
import login from "./login.js";
export default {
    ...login
};
</script>
<style lang="scss" src="./login.scss" scoped></style>