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
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="积分类型" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.type_name}}</template>
                </el-table-column>
                <el-table-column label="总积分" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.total_num}}</template>
                </el-table-column>
                <el-table-column label="参与积分" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.cy_num}}</template>
                </el-table-column>
                <el-table-column label="活动状态" width="100" align="center">
                    <template slot-scope="scope">还未开始|正在进行|已结束</template>
                </el-table-column>
                <el-table-column label="目前参与积分" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.mucy_num}}</template>
                </el-table-column>
                <el-table-column label="描述" align="center">
                    <template slot-scope="scope">{{scope.row.desc}}</template>
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
                :page-size="listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :current-page.sync="listQuery.pageNum"
                :total="total"
            ></el-pagination>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
            <el-form ref="storeCateForm" :model="storeCate" :rules="rules" label-width="120px">
                <el-form-item label="选择类型" prop="type">
                    <el-select
                        v-model="storeCate.type"
                        class="input-width"
                        placeholder="全部"
                        clearable
                    >
                        <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总积分" prop="total">
                    <el-input v-model="storeCate.total" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="参与积分" prop="cy_num">
                    <el-input v-model="storeCate.cy_num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time">
                    <el-date-picker
                        class="input-width"
                        v-model="storeCate.start_time"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择时间"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <el-input v-model="storeCate.desc" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否上线：">
                    <el-radio-group v-model="storeCate.status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="中间积分值" prop="zj_num">
                    <el-input v-model="storeCate.zj_num" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm('productAttrCatForm')">确 定</el-button>
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
                    :current-page.sync="dialogData.listQuery.pageNum"
                    :page-size="dialogData.listQuery.pageSize"
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
export default {
    name: "",
    data() {
        return {
            listLoading: false,
            total: 40,
            dialogVisible: false,
            dialogTitle: "",
            listQuery: {
                pageSize: 10,
                pageNum: 1
            },
            list: [
                {
                    id: 1,
                    type_name: "一分夺宝",
                    total_num: 5000,
                    cy_num: 2,
                    mucy_num: 2000,
                    status: 1,
                    desc: ""
                }
            ],
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
                    pageNum: 1,
                    pageSize: 5
                }
            },
            statusOptions: [
                {
                    value: "一",
                    label: 1
                },
                {
                    value: "一",
                    label: 1
                }
            ],
            rules: {},
            storeCate: {
                name: "",
                total: "",
                cy_num: "",
                start_time: "",
                desc: "",
                status: 1,
                zj_num: ""
            }
        };
    },
    created() {},
    methods: {
        //增加
        addProductAttrCate() {
            this.dialogVisible = true;
            this.dialogTitle = "添加";
            this.storeCate.name = "";
            this.storeCate.id = "";
        },
        //编辑
        handleUpdate(index, row) {
            this.dialogVisible = true;
            this.dialogTitle = "编辑";
            this.storeCate.name = row.name;
            this.storeCate.id = row.id;
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
            console.log(val);
        },
        //翻页页码选择
        handleCurrentChange(val) {
            console.log(val);
        },
        //弹框中确定
        handleConfirm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                } else {
                }
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
    }
};
</script>
    <style lang="scss" scoped>
</style>