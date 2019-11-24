<template>
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span style="margin-left: 10px">数据列表</span>
            <el-button class="btn-add" @click="addformat()" size="mini">添加</el-button>
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
                    <template slot-scope="scope">{{scope.row.gt_id}}</template>
                </el-table-column>
                <el-table-column label="类型名称" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="属性标签" width="340" align="center">
                    <template slot-scope="scope">{{scope.row.attr_value_name}}</template>
                </el-table-column>
                <el-table-column label="排序" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.sort}}</template>
                </el-table-column>
                <el-table-column label="启用状态" width="120" align="center">
                    <template slot-scope="scope">
                        <!-- <el-switch
                            @change="handleShowStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.status"
                        ></el-switch>-->
                        <span v-if="scope.row.status == 1">启用</span>
                        <span v-if="scope.row.status == 0">未启用</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
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
import { getProtypeList, updateProtype } from "@/api/protype";
export default {
    name: "",
    data() {
        return {
            total: 0,
            listLoading: false,
            listQuery: {
                page: 1,
                size: 5
            },
            list: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //初始化商品规格列表
        getList() {
            this.listLoading = true;
            getProtypeList(this.listQuery).then(res => {
                this.total = res.data.total;
                this.list = res.data.list;
                this.listLoading = false;
            });
        },
        //添加
        addformat() {
            this.$router.push("/pms/protype/update");
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
        },
        //是否启用
        handleShowStatusChange(index, row) {
            updateProtype({
                gt_id: row.gt_id,
                //items: row.spec_value_name,
                name: row.name,
                spec_id: row.spec_id,
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
            this.$router.push("/pms/protype/update?id=" + row.gt_id);
        },
        //删除
        handleDelete(index, row) {}
    }
};
</script>