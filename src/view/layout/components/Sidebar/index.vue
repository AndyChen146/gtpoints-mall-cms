<template>
    <scroll-bar>
        <el-menu
            mode="vertical"
            :show-timeout="200"
            :default-active="routePath"
            :collapse="isCollapse"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
        >
            <sidebar-item :routes="routess1"></sidebar-item>
        </el-menu>
    </scroll-bar>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/util/ScrollBar";

export default {
    components: {
        SidebarItem,
        ScrollBar
    },
    computed: {
        ...mapGetters(["sidebar"]),
        routess1() {
            return this.$router.options.routes;
        },
        isCollapse() {
            return !this.sidebar.opened;
        },
        routePath() {
            return this.$route.path;
        }
    }
};
</script>
