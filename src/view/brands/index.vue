<template>
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span style="margin-left: 10px">数据列表</span>
            <el-button class="btn-add" @click="addBrand()" size="mini">添加</el-button>
        </el-card>
        <div class="table-container">
            <el-table
                ref="brandTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border
            >
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.brand_id}}</template>
                </el-table-column>
                <el-table-column label="品牌名称" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="品牌logo" width="200" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.picture" style="width:160px;height:120px" alt />
                    </template>
                </el-table-column>
                <el-table-column label="排序" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.sort}}</template>
                </el-table-column>
                <el-table-column label="是否推荐" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleShowRecommendChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.is_recommend"
                        ></el-switch>
                    </template>
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
        <div class="pagination-container">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :page-size="listQuery.size"
                :page-sizes="[5,10,20]"
                :current-page.sync="listQuery.page"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import { getBrandsList, updateBrands } from "@/api/brand";
export default {
    name: "",
    data() {
        return {
            total: 0,
            listLoading: false,
            listQuery: {
                page: 1,
                size: 10
            },
            list: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //获取品牌列表
        getList() {
            this.listLoading = true;
            getBrandsList(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.total;
                this.listLoading = false;
            });
        },

        //添加
        addBrand() {
            this.$router.push("/pms/brand/update");
        },

        //table 是否显示
        handleShowStatusChange(index, row) {
            updateBrands({
                is_recommend: row.is_recommend,
                name: row.name,
                brand_id: row.brand_id,
                status: row.status
            }).then(res => {
                this.getList();
                this.$message({
                    type: "success",
                    message: "操作成功!"
                });
            });
        },
        //是否推荐
        handleShowRecommendChange(index, row) {
            updateBrands({
                is_recommend: row.is_recommend,
                name: row.name,
                brand_id: row.brand_id,
                status: row.status
            }).then(res => {
                this.getList();
                this.$message({
                    type: "success",
                    message: "操作成功!"
                });
            });
        },
        //编辑
        handleUpdate(index, row) {
            this.$router.push("/pms/brand/update?id=" + row.brand_id);
        },
        //删除
        handleDelete(index, obj) {
            this.$confirm("此操作将永久删除该品牌, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //size 选择
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.listQuery.page = 1;
            this.getList();
        },
        //当前页面切换
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        }
    }
};
</script>
<style lang="scss" scoped>
</style>