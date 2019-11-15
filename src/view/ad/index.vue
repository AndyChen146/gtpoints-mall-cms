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
                    <el-form-item label="广告名称：">
                        <el-input v-model="listQuery.name" class="input-width" placeholder="广告名称"></el-input>
                    </el-form-item>
                    <el-form-item label="广告位置：">
                        <el-select
                            v-model="listQuery.type"
                            placeholder="全部"
                            clearable
                            class="input-width"
                        >
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="到期时间：">
                        <el-date-picker
                            class="input-width"
                            v-model="listQuery.endTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="请选择时间"
                        ></el-date-picker>
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
                <el-table-column label="编号" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="广告名称" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="广告位置" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.type | formatType}}</template>
                </el-table-column>
                <el-table-column label="广告图片" width="160" align="center">
                    <template slot-scope="scope">
                        <img style="height: 80px" :src="scope.row.pic" />
                    </template>
                </el-table-column>
                <el-table-column label="时间" width="220" align="center">
                    <template slot-scope="scope">
                        <p>开始时间：{{scope.row.startTime | formatTime}}</p>
                        <p>到期时间：{{scope.row.endTime | formatTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="上线/下线" width="120" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleUpdateStatus(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.status"
                        ></el-switch>
                    </template>
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
                :page-size="listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :current-page.sync="listQuery.pageNum"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import { formatDate } from "@/util/date";
const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    name: null,
    type: null,
    endTime: null
};
const defaultTypeOptions = [
    {
        label: "大首页轮播",
        value: 0
    },
    {
        label: "商城首页轮播",
        value: 1
    }
];
export default {
    name: "adList",
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            typeOptions: Object.assign({}, defaultTypeOptions),
            list: [
                {
                    id: 1,
                    name: "banner1",
                    type: 1,
                    pic: "",
                    startTime: "",
                    endTime: "",
                    status: 1
                }
            ],
            listLoading: false,
            total: 30
        };
    },
    created() {},
    methods: {
        //筛选
        handleSearchList() {},
        //重置
        handleResetSearch() {},
        //添加广告
        handleAdd() {
            this.$router.push("/sms/ad/index/detail");
        },
        //table事件
        handleSelectionChange() {},
        //广告上下线切换
        handleUpdateStatus() {},
        //列表编辑
        handleUpdate(index, row) {
            this.$router.push("/sms/ad/index/detail?id=" + row.id);
        },
        //列表删除
        handleDelete(index, row) {},
        //翻页选择
        handleSizeChange(val) {},
        //页码切换
        handleCurrentChange(val) {}
    },
    filters: {
        formatType(type) {
            if (type === 1) {
                return "大首页轮播";
            } else {
                return "商城首页轮播";
            }
        },
        formatTime(time) {
            if (time == null || time === "") {
                return "N/A";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    }
};
</script>
<style lang="scss" scoped>
</style>