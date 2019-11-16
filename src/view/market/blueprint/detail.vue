<template>
    <div>
        <el-card class="form-container" shadow="never">
            <el-form
                :model="homeAdvertise"
                ref="homeAdvertiseFrom"
                label-width="150px"
                size="small"
            >
                <el-form-item label="用户名：">
                    <el-input v-model="homeAdvertise.username" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input v-model="homeAdvertise.mobile" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="开始时间：">
                    <el-input v-model="homeAdvertise.start_time" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="评论数量：">
                    <el-input v-model="homeAdvertise.nums" style="width:50%" class="input-width"></el-input>
                    <el-button type="primary" class="detail" @click="onSubmit()">详情</el-button>
                </el-form-item>
                <el-form-item label="点赞数量：">
                    <el-input v-model="homeAdvertise.dznums" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="内容：">
                    <el-input type="textarea" v-model="homeAdvertise.text" class="input-width"></el-input>
                </el-form-item>
            </el-form>
        </el-card>

        <el-dialog title="查看评论" :visible.sync="selectDialogVisible" width="60%">
            <el-table :data="dialogData.list" border>
                <el-table-column label="用户名" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="手机号" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.mobile}}</template>
                </el-table-column>
                <el-table-column label="时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.start_time}}</template>
                </el-table-column>
                <el-table-column label="内容" align="center">
                    <template slot-scope="scope">{{scope.row.contact}}</template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination
                    background
                    @current-change="handleDialogCurrentChange"
                    layout="prev, pager, next"
                    :current-page.sync="dialogData.listQuery.pageNum"
                    :page-size="dialogData.listQuery.pageSize"
                    :total="dialogData.total"
                ></el-pagination>
            </div>
            <div style="clear: both;"></div>
            <div slot="footer">
                <el-button size="small" @click="selectDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
    <script>
export default {
    name: "",
    data() {
        return {
            homeAdvertise: {
                username: "andychen",
                mobile: "17098048846",
                start_time: "2019-10-10 10:00:00",
                nums: "10",
                dznums: "300",
                text: "ashdiuashdi"
            },
            selectDialogVisible: false,
            dialogData: {
                total: 10,
                list: [
                    {
                        name: "andy",
                        mobile: "13566662222",
                        start_time: "2019-10-10 10:10:10",
                        contact: "哇，太漂亮了！"
                    }
                ],
                listQuery: {
                    pageNum: 1,
                    pageSize: 5
                }
            }
        };
    },
    created() {},
    methods: {
        //点击详情
        onSubmit() {
            this.selectDialogVisible = true;
        },
        //评论详情翻页选择
        handleDialogCurrentChange(val) {}
    }
};
</script>
<style lang="scss" scoped>
.detail {
    margin-left: 20px;
}
</style>