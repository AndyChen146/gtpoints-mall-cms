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
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="分类名称" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="分类图标" align="center">
                    <template slot-scope="scope">{{scope.row.img}}</template>
                </el-table-column>
                <el-table-column label="级别" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
                </el-table-column>
                <el-table-column label="商品数量" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.productCount }}</template>
                </el-table-column>
                <el-table-column label="是否显示" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleShowStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.showStatus"
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
        <div class="pagination-container">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :page-size="listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :current-page.sync="listQuery.pageNum"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: "",
    data() {
        return {
            listLoading: false,
            total: 40,
            listQuery: {
                pageSize: 10,
                pageNum: 1
            },
            list: [
                {
                    id: 1,
                    name: "服装",
                    level: 1,
                    productCount: 20,
                    showStatus: 1,
                    sort: 2,
                    img: ""
                }
            ]
        };
    },
    created() {},
    methods: {
        //添加
        handleAddProductCate() {
            this.$router.push("/pms/proattr/update");
        },

        //翻页size选择
        handleSizeChange(val) {
            console.log(val);
        },
        //翻页页码选择
        handleCurrentChange(val) {
            console.log(val);
        },
        //分类是否显示状态切换
        handleShowStatusChange(index, obj) {},
        //分类编辑
        handleUpdate(index, obj) {},
        //分类删除
        handleDelete(index, obj) {}
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