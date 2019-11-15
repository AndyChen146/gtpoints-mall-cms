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
                <el-table-column label="类型名称" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="属性数量" width="200" align="center">
                    <template
                        slot-scope="scope"
                    >{{scope.row.attributeCount==null?0:scope.row.attributeCount}}</template>
                </el-table-column>
                <el-table-column label="设置" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="getAttrList(scope.$index, scope.row)">属性列表</el-button>
                    </template>
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

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
            <el-form
                ref="productAttrCatForm"
                :model="productAttrCate"
                :rules="rules"
                label-width="120px"
            >
                <el-form-item label="类型名称" prop="name">
                    <el-input v-model="productAttrCate.name" auto-complete="off"></el-input>
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
            listLoading: false,
            listQuery: {
                pageSize: 10,
                pageNum: 1
            },
            total: 20,
            dialogVisible: false,
            dialogTitle: "",
            productAttrCate: {
                name: "",
                id: null
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入类型名称",
                        trigger: "blur"
                    }
                ]
            },
            list: [
                {
                    id: 1,
                    name: "服装-T桖",
                    attributeCount: 2
                }
            ]
        };
    },
    created() {},
    methods: {
        //添加
        addProductAttrCate() {
            this.dialogVisible = true;
            this.dialogTitle = "添加类型";
            this.productAttrCate.name = "";
            this.productAttrCate.id = "";
        },
        //编辑
        handleUpdate(index, obj) {
            this.dialogVisible = true;
            this.dialogTitle = "编辑类型";
            this.productAttrCate.name = obj.name;
            this.productAttrCate.id = obj.id;
        },
        //删除
        handleDelete(index, obj) {},
        //属性设置
        getAttrList(index, obj) {
            this.$router.push("/pms/proattr/index/attr?id=" + obj.id);
        },

        //翻页页面选择
        handleSizeChange(val) {},
        //页码切换
        handleCurrentChange(val) {},
        //弹框中确定
        handleConfirm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                } else {
                }
            });
        }
    }
};
</script>
    <style lang="scss" scoped>
</style>