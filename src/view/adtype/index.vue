<template>
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets" style="margin-top: 5px"></i>
            <span style="margin-top: 5px;margin-left: 10px">数据列表</span>
            <el-button class="btn-add" @click="addAdTypeDialog()" size="mini">添加</el-button>
        </el-card>
        <div class="table-container">
            <el-table
                ref="productAttrCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading"
                border
            >
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.aid}}</template>
                </el-table-column>
                <el-table-column label="名称" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="代码" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.code}}</template>
                </el-table-column>
                <el-table-column label="宽度" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.width}}</template>
                </el-table-column>
                <el-table-column label="高度" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.height}}</template>
                </el-table-column>
                <el-table-column label="备注" align="center">
                    <template slot-scope="scope">{{scope.row.remarks}}</template>
                </el-table-column>
                <el-table-column label="操作" width="240" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editInfo(scope.$index, scope.row)">编辑</el-button>
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
                :page-sizes="[5,10,15]"
                :current-page.sync="listQuery.page"
                :total="total"
            ></el-pagination>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
            <el-form ref="storeCateForm" :model="storeCate" :rules="rules" label-width="120px">
                <el-form-item label="广告位名称：" prop="name">
                    <el-input
                        v-model="storeCate.name"
                        auto-complete="off"
                        placeholder="请输入名称，例如：首页轮播图"
                    ></el-input>
                </el-form-item>
                <el-form-item label="广告位代码：" prop="code">
                    <el-input
                        v-model="storeCate.code"
                        auto-complete="off"
                        placeholder="例如：HOME_TOP"
                    ></el-input>
                </el-form-item>
                <el-form-item label="广告位宽度：" prop="width">
                    <el-input v-model.number="storeCate.width" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告位高度：" prop="height">
                    <el-input v-model.number="storeCate.height" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="广告位类型">
                    <el-radio-group v-model="storeCate.type">
                        <el-radio :label="1">图片</el-radio>
                        <el-radio :label="2">视频</el-radio>
                        <el-radio :label="3">文本</el-radio>
                    </el-radio-group>
                </el-form-item>-->
                <el-form-item label="备注：" prop="remarks">
                    <el-input v-model="storeCate.remarks" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm('storeCateForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getAdTypeList, updataAdTypeInfo, delAdTypeList } from "@/api/ad";
export default {
    name: "",
    data() {
        return {
            listLoading: false,
            list: [],
            total: 20,
            listQuery: {
                page: 1,
                size: 10
            },
            dialogTitle: "",
            dialogVisible: false,
            storeCate: {
                name: "",
                code: "",
                width: "",
                height: "",
                type: 1,
                remarks: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入广告位名称",
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "请输入广告位代码",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //获取list
        getList() {
            this.listLoading = true;
            getAdTypeList(this.listQuery).then(res => {
                this.listLoading = false;
                this.list = res.data.list;
                this.total = res.data.total;
            });
        },
        //添加
        addAdTypeDialog() {
            this.dialogVisible = true;
            this.dialogTitle = "添加";
            this.storeCate.name = "";
            this.storeCate.code = "";
            this.storeCate.width = "";
            this.storeCate.height = "";
            this.storeCate.remarks = "";
            this.storeCate.aid = "";
        },
        //编辑
        editInfo(index, row) {
            this.dialogVisible = true;
            this.dialogTitle = "编辑";
            this.storeCate.name = row.name;
            this.storeCate.code = row.code;
            this.storeCate.width = row.width;
            this.storeCate.height = row.height;
            this.storeCate.remarks = row.remarks;
            this.storeCate.aid = row.aid;
        },
        //删除
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该广告位, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                delAdTypeList({
                    aid: row.aid
                }).then(res => {
                    this.$message.success("删除成功");
                    this.getList();
                });
            });
        },
        //翻页选择
        handleSizeChange(val) {},
        //翻页跳转
        handleCurrentChange(val) {},
        //弹框确定
        handleConfirm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.updataDate(this.storeCate);
                } else {
                }
            });
        },
        //数据服务端提交
        updataDate(obj) {
            updataAdTypeInfo(obj).then(res => {
                this.$message.success("操作成功");
                this.getList();
                this.dialogVisible = false;
            });
        }
    }
};
</script>
<style lang="scss" scoped></style>