<template>
    <el-menu class="navbar" mode="horizontal">
        <Hamburger
            class="hamburger-container"
            :toggleClick="TogglesSideBar"
            :isActive="sidebar.opened"
        ></Hamburger>
        <Breadcrumb></Breadcrumb>
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <!-- <img :src="avatar" alt class="user-avatar" /> -->
                <img src="@/assets/tx.png" alt class="user-avatar" />
                <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link class="inlineBlock" to="/member">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                    <span @click="logout" style="display:block">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
</template>
<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/util/Hamburger";
import Breadcrumb from "@/components/util/Breadcrumb";
export default {
    name: "Navbar",
    components: {
        Hamburger,
        Breadcrumb
    },
    computed: {
        ...mapGetters(["sidebar", "avatar"])
    },
    methods: {
        TogglesSideBar() {
            this.$store.dispatch("TogglesSideBar");
        },
        logout() {
            this.$store.dispatch("LogOut").then(() => {
                this.$router.push("/login");
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>
