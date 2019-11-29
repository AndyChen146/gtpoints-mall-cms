<template>
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets" style="margin-top: 5px"></i>
            <span style="margin-top: 5px;margin-left: 10px">数据列表</span>
            <el-button class="btn-add" @click="addProductAttrCate()" size="mini">添加</el-button>
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
                    <template slot-scope="scope">{{scope.row.af_id}}</template>
                </el-table-column>
                <el-table-column label="名称" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="图片" width="140" align="center">
                    <template slot-scope="scope">
                        <img style="width:110px" :src="scope.row.picture" alt />
                    </template>
                </el-table-column>
                <el-table-column label="开始时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.stime | formatTimes}}</template>
                </el-table-column>
                <!-- <el-table-column label="活动状态" width="100" align="center">
                    <template slot-scope="scope">还未开始|正在进行|已结束</template>
                </el-table-column>-->

                <!-- <el-table-column label="实时参与抢购" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.mucy_num}}</template>
                </el-table-column>-->
                <el-table-column label="描述" align="center">
                    <template slot-scope="scope">{{scope.row.remark}}</template>
                </el-table-column>
                <el-table-column label="启用/禁用" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleShowStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.status"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="240" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            @click="selectGoodsList(scope.$index, scope.row)"
                        >选择商品</el-button>
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
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="storeCate.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动图片：" prop="picture">
                    <single-upload v-model="storeCate.picture"></single-upload>
                </el-form-item>
                <el-form-item label="开始时间" prop="stime">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="storeCate.stime"></el-date-picker>
                </el-form-item>

                <el-form-item label="是否上线：">
                    <el-radio-group v-model="storeCate.status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="storeCate.remark" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm('storeCateForm')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="选择商品" :visible.sync="selectDialogVisible" width="50%">
            <el-input
                v-model="dialogData.listQuery.keyword"
                style="width: 250px;margin-bottom: 20px"
                size="small"
                placeholder="商品名称搜索"
            >
                <el-button slot="append" icon="el-icon-search" @click="handleSelectSearch()"></el-button>
            </el-input>
            <el-table
                :data="dialogData.list"
                @selection-change="handleDialogSelectionChange"
                border
            >
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="货号" width="160" align="center">
                    <template slot-scope="scope">NO.{{scope.row.productSn}}</template>
                </el-table-column>
                <el-table-column label="价格" width="120" align="center">
                    <template slot-scope="scope">￥{{scope.row.price}}</template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination
                    background
                    @current-change="handleDialogCurrentChange"
                    layout="prev, pager, next"
                    :current-page.sync="dialogData.listQuery.page"
                    :page-size="dialogData.listQuery.size"
                    :total="dialogData.total"
                ></el-pagination>
            </div>
            <div style="clear: both;"></div>
            <div slot="footer">
                <el-button size="small" @click="selectDialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="handleSelectDialogConfirm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    getFreePanicList,
    setFreePanic,
    setFreePanicStatus,
    setFreePanicGoods,
    getFreePanicGoods
} from "@/api/market";
import SingleUpload from "@/components/util/Upload/singleUpload";
import { formatTime } from "@/util/datas";
export default {
    name: "",
    components: { SingleUpload },
    data() {
        return {
            listLoading: false,
            total: 0,
            dialogVisible: false,
            dialogTitle: "",
            listQuery: {
                size: 10,
                page: 1
            },
            list: [],
            selectDialogVisible: false,
            dialogData: {
                list: [
                    {
                        name: "商品名称",
                        productSn: "2839123",
                        price: "123.00"
                    }
                ],
                total: 10,
                multipleSelection: [],
                listQuery: {
                    keyword: null,
                    page: 1,
                    size: 10
                }
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    }
                ],
                stime: [
                    {
                        required: true,
                        message: "请选择开始时间",
                        trigger: "blur"
                    }
                ],
                picture: [
                    {
                        required: true,
                        message: "请上传图片",
                        trigger: "blur"
                    }
                ]
            },
            storeCate: {
                name: "",
                picture: "",
                stime: "",
                remark: "",
                status: 1
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //获取列表
        getList() {
            this.listLoading = true;
            getFreePanicList(this.listQuery).then(res => {
                this.listLoading = false;
                this.list = res.data.list;
                this.total = res.data.total;
            });
        },
        //增加
        addProductAttrCate() {
            this.dialogVisible = true;
            this.dialogTitle = "添加";
            this.storeCate.name = "";
            this.storeCate.af_id = "";
            this.storeCate.stime = "";
            this.storeCate.status = 1;
            this.storeCate.picture = "";
            this.storeCate.remark = "";
        },
        //编辑
        handleUpdate(index, row) {
            this.dialogVisible = true;
            this.dialogTitle = "编辑";
            this.storeCate.name = row.name;
            this.storeCate.af_id = row.af_id;
            this.storeCate.stime = formatTime(row.stime);
            this.storeCate.status = row.status;
            this.storeCate.picture = row.picture;
            this.storeCate.remark = row.remark;
        },
        //选择商品
        selectGoodsList(index, row) {
            this.selectDialogVisible = true;
        },
        //删除
        handleDelete(index, row) {},
        //是否显示状态切换
        handleShowStatusChange(index, row) {},
        //翻页size选择
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.listQuery.page = 1;
            this.getList();
        },
        //翻页页码选择
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        //弹框中确定
        handleConfirm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.storeCate.stime =
                        new Date(this.storeCate.stime).getTime() / 1000;
                    if (this.storeCate.af_id != "") {
                        this.storeCate.af_id = this.storeCate.af_id;
                        this.UpdateFormData(this.storeCate);
                    } else {
                        this.UpdateFormData(this.storeCate);
                    }
                } else {
                }
            });
        },
        UpdateFormData(obj) {
            setFreePanic(obj).then(res => {
                this.$message.success("操作成功！");
                this.dialogVisible = false;
                this.getList();
            });
        },
        //选择商品中的搜索
        handleSelectSearch() {},
        handleDialogSelectionChange(val) {
            this.dialogData.multipleSelection = val;
        },
        //选择商品中的确定
        handleSelectDialogConfirm() {},
        //选择商品中页码翻页
        handleDialogCurrentChange(val) {
            console.log(val);
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