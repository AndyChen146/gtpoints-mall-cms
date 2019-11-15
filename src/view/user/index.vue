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
                            placeholder="输入用户名/手机号"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span style="margin-left: 10px">数据列表</span>
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
                <el-table-column label="用户名" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="手机号" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.iphone}}</template>
                </el-table-column>
                <el-table-column label="消费金额" width="100" align="center">
                    <template slot-scope="scope">¥{{scope.row.assort}}</template>
                </el-table-column>
                <el-table-column label="订单数量" width="80" align="center">
                    <template slot-scope="scope">{{scope.row.number}}</template>
                </el-table-column>
                <el-table-column label="积分数量" width="80" align="center">
                    <template slot-scope="scope">{{scope.row.sorte}}</template>
                </el-table-column>
                <el-table-column label="账号启用状态" width="120" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleShowStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.showStatus"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="收货地址" align="center">
                    <template slot-scope="scope">{{scope.row.address}}</template>
                </el-table-column>
                <el-table-column label="来源" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.fromli}}</template>
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">详情</el-button>
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
                    name: "andychen",
                    iphone: "17098048846",
                    assort: "0.00",
                    sorte: 1,
                    showStatus: 0,
                    number: 100,
                    fromli: "wechat",
                    address: "江西吉安"
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
        //详情
        handleUpdate(index, obj) {
            this.$router.push("/ums/index/detail?id=" + obj.id);
        },

        //size 选择
        handleSizeChange(val) {},
        //当前页面切换
        handleCurrentChange(val) {}
    }
};
</script>
<style lang="scss" scoped>
</style>