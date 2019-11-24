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
                <el-button
                    style="float:right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small"
                >重置</el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="广告位置：">
                        <el-select
                            v-model="listQuery.aid"
                            placeholder="全部"
                            clearable
                            class="input-width"
                        >
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.aid"
                                :label="item.name"
                                :value="item.aid"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="到期时间：">
                        <el-select
                            v-model="listQuery.status"
                            placeholder="全部"
                            clearable
                            class="input-width"
                        >
                            <el-option
                                v-for="item in statusOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span style="margin-left:10px">数据列表</span>
            <el-button size="mini" class="btn-add" @click="handleAdd()">添加广告</el-button>
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
                <el-table-column label="编号" width="60" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="广告名称" align="center">
                    <template slot-scope="scope">{{scope.row.title}}</template>
                </el-table-column>
                <el-table-column label="广告链接" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.url}}</template>
                </el-table-column>
                <el-table-column label="广告图片" width="160" align="center">
                    <template slot-scope="scope">
                        <img style="width: 90px;" :src="scope.row.content" />
                    </template>
                </el-table-column>
                <el-table-column label="时间" width="240" align="center">
                    <template slot-scope="scope">
                        <p>开始时间：{{scope.row.stime | formatTimes}}</p>
                        <p>到期时间：{{scope.row.etime | formatTimes}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="排序" width="80" align="center">
                    <template slot-scope="scope">{{scope.row.sort}}</template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleUpdate(scope.$index, scope.row)"
                        >编辑</el-button>
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
                :page-size="listQuery.size"
                :page-sizes="[5,10,15]"
                :current-page.sync="listQuery.page"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import { formatTime } from "@/util/datas";
import { getAdList, getAdTypeList, delAdInfo } from "@/api/ad";
export default {
    name: "adList",
    data() {
        return {
            listQuery: {
                aid: 1,
                page: 1,
                size: 10,
                status: 3
            },
            typeOptions: [],
            statusOptions: [
                {
                    id: 3,
                    name: "全部"
                },
                {
                    id: 0,
                    name: "未开始"
                },
                {
                    id: 1,
                    name: "已开始"
                },
                {
                    id: 2,
                    name: "已过期"
                }
            ],
            list: [],
            listLoading: false,
            total: 30
        };
    },
    created() {
        this.getAdList();
        this.getList();
    },
    methods: {
        //获取广告位列表
        getAdList() {
            getAdTypeList({ page: 1, size: 100 }).then(res => {
                this.typeOptions = res.data.list;
            });
        },

        // 获取广告列表
        getList() {
            this.listLoading = true;
            getAdList(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.total;
                this.listLoading = false;
            });
        },
        //筛选
        handleSearchList() {
            this.getList();
        },
        //重置
        handleResetSearch() {
            this.listQuery.aid = 1;
            this.listQuery.page = 1;
            this.listQuery.size = 10;
            this.listQuery.status = 3;
            this.getList();
        },
        //添加广告
        handleAdd() {
            this.$router.push("/sms/ad/index/detail");
        },
        //table事件
        handleSelectionChange() {},

        //列表编辑
        handleUpdate(index, row) {
            this.$router.push("/sms/ad/index/detail?id=" + row.id);
        },
        //列表删除
        handleDelete(index, row) {
            let _self = this;
            this.$confirm("此操作将永久删除该广告, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                delAdInfo({ id: row.id }).then(res => {
                    _self.$message.success("删除成功");
                    _self.getList();
                });
            });
        },
        //翻页选择
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.listQuery.page = 1;
            this.getList();
        },
        //页码切换
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        }
    },
    filters: {
        formatTimes(time) {
            if (time == null || time === "") {
                return "N/A";
            }
            let date = new Date(time);
            return formatTime(time);
        }
    }
};
</script>
<style lang="scss" scoped>
</style>