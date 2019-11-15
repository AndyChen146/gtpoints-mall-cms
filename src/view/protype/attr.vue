<template>
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets" style="margin-top: 5px"></i>
            <span style="margin-top: 5px;margin-left:10px">数据列表</span>
            <el-button class="btn-add" @click="addProductAttr()" size="mini">添加</el-button>
        </el-card>
        <div class="table-container">
            <el-table
                ref="productAttrTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
            >
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="属性名称" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="商品类型" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.type}}</template>
                </el-table-column>
                <el-table-column label="属性是否可选" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.selectType|selectTypeFilter}}</template>
                </el-table-column>
                <el-table-column label="可选值列表" align="center">
                    <template slot-scope="scope">{{scope.row.inputList}}</template>
                </el-table-column>
                <el-table-column label="排序" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.sort}}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
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
                :page-size="listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :current-page.sync="listQuery.pageNum"
                :total="total"
            ></el-pagination>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
            <el-form
                ref="productAttrCatForm"
                :model="productAttrCate"
                :rules="rules"
                label-width="160px"
            >
                <el-form-item label="属性名称" prop="name">
                    <el-input v-model="productAttrCate.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品类型" prop="type">
                    <el-input v-model="productAttrCate.type" readonly auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性值可选值列表:">
                    <el-radio-group v-model="productAttrCate.showStatus">
                        <el-radio :label="1">多选</el-radio>
                        <el-radio :label="0">单选</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="排序：">
                    <el-input v-model="productAttrCate.sort"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model="productAttrCate.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm('productAttrCatForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
    <script>
export default {
    name: "",
    data() {
        return {
            listQuery: {
                pageSize: 10,
                pageNum: 1
            },
            total: 30,
            dialogVisible: false,
            dialogTitle: "",
            listLoading: false,
            productAttrCate: {
                name: "",
                id: null,
                type: "",
                sort: "",
                showStatus: 1,
                desc: ""
            },
            inputListFormat: null,
            list: [
                {
                    id: 1,
                    name: "颜色",
                    type: "服装-T桖",
                    selectType: 1,
                    inputList: [],
                    sort: 2
                }
            ],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入属性名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {},
    methods: {
        //添加
        addProductAttr() {
            this.dialogVisible = true;
            this.dialogTitle = "添加类型";
            this.productAttrCate.name = "";
            this.productAttrCate.id = "";
        },
        handleSelectionChange() {},
        //编辑
        handleUpdate(index, row) {
            this.dialogVisible = true;
            this.dialogTitle = "编辑类型";
            this.productAttrCate.name = row.name;
            this.productAttrCate.id = row.id;
        },
        //删除
        handleDelete(index, row) {},
        //翻页选择
        handleSizeChange(val) {},
        //当前翻页切换
        handleCurrentChange(val) {},
        //属性编辑新增确定
        handleConfirm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                } else {
                }
            });
        }
    },
    filters: {
        selectTypeFilter(value) {
            if (value === 1) {
                return "单选";
            } else if (value === 2) {
                return "多选";
            } else {
                return "唯一";
            }
        }
    }
};
</script>
    <style lang="scss" scoped>
</style>