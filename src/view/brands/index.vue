<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span style="margin-left: 10px">筛选搜索</span>
                <el-button
                    style="float: right"
                    @click="searchBrandList()"
                    type="primary"
                    size="small"
                >查询结果</el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input
                            style="width: 203px"
                            v-model="listQuery.keyword"
                            placeholder="品牌名称/关键字"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
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
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
            >
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="品牌名称" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="英文名称" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.enname}}</template>
                </el-table-column>
                <el-table-column label="品牌logo" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.img}}</template>
                </el-table-column>
                <el-table-column label="商品数量" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.number}}</template>
                </el-table-column>
                <el-table-column label="排序" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.sort}}</template>
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
            total: 40,
            listLoading: false,
            listQuery: {
                keyword: "",
                pageNum: 1,
                pageSize: 10
            },
            list: [
                {
                    id: 1,
                    name: "耐克",
                    enname: "NIKE",
                    img: "",
                    sort: 1,
                    showStatus: 0,
                    number: 100
                }
            ]
        };
    },
    created() {},
    methods: {
        //搜索
        searchBrandList() {},
        //添加
        addBrand() {
            this.$router.push("/pms/brand/update");
        },

        //table选择
        handleSelectionChange() {},

        //table 是否显示
        handleShowStatusChange(index, obj) {},
        //编辑
        handleUpdate(index, obj) {},
        //删除
        handleDelete(index, obj) {},
        //size 选择
        handleSizeChange(val) {},
        //当前页面切换
        handleCurrentChange(val) {}
    }
};
</script>
<style lang="scss" scoped>
</style>