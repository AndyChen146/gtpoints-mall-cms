<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span style="margin-left:10px">筛选搜索</span>
                <el-button
                    style="float:right"
                    type="primary"
                    @click="handleSearchList()"
                    size="small"
                >查询搜索</el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="用户名/手机号：">
                        <el-input
                            v-model="listQuery.keyword"
                            class="input-width"
                            placeholder="用户名/手机号"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span style="margin-left:10px">数据列表</span>
        </el-card>
        <div class="table-container">
            <el-table
                ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
            >
                <el-table-column label="编号" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="用户名" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.username}}</template>
                </el-table-column>
                <el-table-column label="手机号" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.mobile}}</template>
                </el-table-column>
                <el-table-column label="创建时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.start_time}}</template>
                </el-table-column>
                <el-table-column label="评论数" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.nums}}</template>
                </el-table-column>
                <el-table-column label="点赞数" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.dznums}}</template>
                </el-table-column>
                <el-table-column label="是否显示" width="120" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleUpdateStatus(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.status"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleDetail(scope.$index, scope.row)"
                        >详情</el-button>
                        <el-button
                            size="mini"
                            type="text"
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
            listQuery: {
                pageSize: 1,
                pageNum: 10,
                keyword: ""
            },
            total: 20,
            listLoading: false,
            list: [
                {
                    id: 1,
                    username: "andychen",
                    mobile: "17098048846",
                    start_time: "2019-10-10 10:00:00",
                    nums: 10,
                    dznums: 100,
                    status: 0
                }
            ]
        };
    },
    created() {},
    methods: {
        //搜索
        handleSearchList() {},
        //table
        handleSelectionChange() {},
        //翻页size选择
        handleSizeChange(val) {
            console.log(val);
        },
        //当前页选择
        handleCurrentChange(val) {
            console.log(val);
        },
        //是否显示
        handleUpdateStatus(index, row) {},
        //详情
        handleDetail(index, row) {
            this.$router.push("/sms/markblue/index/info?id=" + row.id);
        },
        //删除
        handleDelete(index, row) {}
    }
};
</script>
    <style lang="scss" scoped>
</style>