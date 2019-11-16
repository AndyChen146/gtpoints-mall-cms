<template>
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets" style="margin-top: 5px"></i>
            <span style="margin:5px 0px 0px 10px">数据列表</span>
            <el-button class="btn-add" @click="handleAddProductCate()" size="mini">添加</el-button>
        </el-card>
        <div class="table-container">
            <el-table
                ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading"
                border
            >
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.category_id}}</template>
                </el-table-column>
                <el-table-column label="分类名称" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="分类图标" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.picture" style="width:120px;height:90px" alt />
                    </template>
                </el-table-column>
                <el-table-column label="级别" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.pid}}</template>
                </el-table-column>

                <el-table-column label="是否显示" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleShowStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.status"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="排序" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.sort }}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getCateList, updateCateInfo } from "@/api/category";
export default {
    name: "",
    data() {
        return {
            listLoading: false,
            list: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //获取分类列表
        getList() {
            getCateList(this.listQuery).then(res => {
                this.list = res.data.list;
            });
        },

        //添加
        handleAddProductCate() {
            this.$router.push("/pms/proattr/update");
        },
        //分类是否显示切换
        handleShowStatusChange(index, row) {
            updateCateInfo({
                name: row.name,
                category_id: row.category_id,
                status: row.status
            }).then(res => {
                this.getList();
                this.$message({
                    type: "success",
                    message: "操作成功!"
                });
            });
        },
        //分类编辑
        handleUpdate(index, row) {
            this.$router.push("/pms/proattr/update?id=" + row.category_id);
        },
        //分类删除
        handleDelete(index, row) {}
    },
    filters: {
        levelFilter(value) {
            if (value === 0) {
                return "一级";
            } else if (value === 1) {
                return "二级";
            }
        }
    }
};
</script>
<style lang="scss" scoped>
</style>