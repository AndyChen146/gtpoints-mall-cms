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
                    <template slot-scope="scope">{{scope.row.ap_id}}</template>
                </el-table-column>
                <el-table-column label="积分名称" width="120" align="center">
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
                <el-table-column label="参与积分" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.point}}</template>
                </el-table-column>
                <!-- <el-table-column label="活动状态" width="100" align="center">
                    <template slot-scope="scope">还未开始|正在进行|已结束</template>
                </el-table-column>-->
                <!-- <el-table-column label="目前参与积分" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.mucy_num}}</template>
                </el-table-column>-->
                <el-table-column label="描述" align="center">
                    <template slot-scope="scope">{{scope.row.remark}}</template>
                </el-table-column>
                <el-table-column label="上线/下线" width="100" align="center">
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
                <el-form-item label="积分名称：" prop="name">
                    <el-input v-model="storeCate.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="参与积分：" prop="point">
                    <el-input v-model.number="storeCate.point" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始时间：" prop="stime">
                    <el-date-picker
                        class="input-width"
                        v-model="storeCate.stime"
                        type="datetime"
                        placeholder="请选择时间"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="积分图片：" prop="picture">
                    <single-upload v-model="storeCate.picture"></single-upload>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-radio-group v-model="storeCate.status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="storeCate.remark" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm('storeCateForm')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="选择商品" :visible.sync="selectDialogVisible" width="70%">
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
                <el-table-column
                    type="selection"
                    width="60"
                    align="center"
                    :selectable="checkboxInit"
                ></el-table-column>
                <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">{{scope.row.title}}</template>
                </el-table-column>
                <el-table-column label="商品库存" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.stock}}</template>
                </el-table-column>
                <el-table-column label="商品单价" width="100" align="center">
                    <template slot-scope="scope">￥{{scope.row.price}}</template>
                </el-table-column>

                <el-table-column label="已参与积分" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.point_total}}</template>
                </el-table-column>
                <el-table-column label="商品所需积分" width="160" align="center">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.goods_point"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="中奖积分" width="160" align="center">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.lucky"></el-input>
                    </template>
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
    pointStoreList,
    setPointStore,
    setPointStoreStatus,
    getPointStoreGoods
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
                page: 1,
                size: 10
            },
            ap_id: "",
            list: [],
            selectDialogVisible: false,
            dialogData: {
                list: [],
                total: 0,
                multipleSelection: [],
                listQuery: {
                    keyword: "",
                    page: 1,
                    size: 5,
                    category_id: ""
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
                point: [
                    {
                        required: true,
                        message: "请输入参与积分",
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
                point: "",
                stime: "",
                picture: "",
                remark: "",
                status: 1
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //获取积分列表
        getList() {
            this.listLoading = true;
            pointStoreList(this.listQuery).then(res => {
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
            this.storeCate.ap_id = "";
            this.storeCate.picture = "";
            this.storeCate.status = 1;
            this.storeCate.stime = "";
            this.storeCate.point = "";
            this.storeCate.remark = "";
        },
        //编辑
        handleUpdate(index, row) {
            this.dialogVisible = true;
            this.dialogTitle = "编辑";
            this.storeCate.name = row.name;
            this.storeCate.ap_id = row.ap_id;
            this.storeCate.picture = row.picture;
            this.storeCate.status = row.status;
            this.storeCate.stime = formatTime(row.stime);
            this.storeCate.point = row.point;
            this.storeCate.remark = row.remark;
        },
        //选择商品
        selectGoodsList(index, row) {
            this.selectDialogVisible = true;
            this.ap_id = row.ap_id;
            this.getGoodsList();
        },
        //获取活动商品列表
        getGoodsList() {
            getPointStoreGoods(this.dialogData.listQuery).then(res => {
                this.dialogData.list = res.data.list;
                this.dialogData.total = res.data.total;
            });
        },
        //删除
        handleDelete(index, row) {},
        //是否显示状态切换
        handleShowStatusChange(index, row) {
            setPointStoreStatus({
                ap_id: row.ap_id,
                status: row.status
            }).then(res => {
                this.$message.success("操作成功！");
                this.getList();
            });
        },
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
                    if (this.storeCate.ap_id != "") {
                        this.storeCate.ap_id = this.storeCate.ap_id;
                        this.UpdateFormData(this.storeCate);
                    } else {
                        this.UpdateFormData(this.storeCate);
                    }
                } else {
                }
            });
        },
        UpdateFormData(obj) {
            setPointStore(obj).then(res => {
                this.$message.success("操作成功！");
                this.dialogVisible = false;
                this.getList();
            });
        },
        //选择商品中的搜索
        handleSelectSearch() {
            this.dialogData.listQuery.page = 1;
            this.getGoodsList();
        },
        handleDialogSelectionChange(val) {
            this.dialogData.multipleSelection = [];
            val.forEach(element => {
                let obj = {
                    goods_id: element.goods_id,
                    goods_point: element.goods_point,
                    lucky: element.lucky
                };
                this.dialogData.multipleSelection.push(obj);
            });
        },
        //选择商品中的确定
        handleSelectDialogConfirm() {
            if (
                this.ap_id == "" ||
                this.dialogData.multipleSelection.length === 0
            ) {
                this.$message.closeAll();
                return this.$message.error("请勾选商品");
            }
            console.log(this.ap_id);
            console.log(this.dialogData.multipleSelection);
            // setPointStoreGoods({
            //     ap_id: this.ap_id,
            //     ids: this.dialogData.multipleSelection
            // }).then(res => {
            //     console.log(res);
            // });
        },
        //控制商品是否选中
        checkboxInit(row, index) {
            return 1;
        },
        //选择商品中页码翻页
        handleDialogCurrentChange(val) {
            this.dialogData.listQuery.page = val;
            this.getGoodsList();
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