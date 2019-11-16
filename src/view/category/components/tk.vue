<template>
    <el-card class="form-container" shadow="never">
        <el-form :model="productCate" :rules="rules" ref="productCateFrom" label-width="150px">
            <el-form-item label="分类名称：" prop="name">
                <el-input v-model="productCate.name"></el-input>
            </el-form-item>
            <el-form-item label="上级分类：" prop="pid">
                <el-select v-model="productCate.pid" placeholder="请选择分类">
                    <el-option
                        v-for="item in selectProductCateList"
                        :key="item.category_id"
                        :label="item.name"
                        :value="item.category_id"
                    ></el-option>
                </el-select>
                <span style="margin-left:10px;font-size:12px;color:#999">一级分类可不选或者为0</span>
            </el-form-item>

            <el-form-item label="是否显示：">
                <el-radio-group v-model="productCate.status">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="分类图标：" prop="picture">
                <single-upload v-model="productCate.picture" cate="icon"></single-upload>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model="productCate.sort"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('productCateFrom')">提交</el-button>
                <el-button @click="resetForm">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import SingleUpload from "@/components/util/Upload/singleUpload";
import { getCateList, updateCateInfo, getCateInfo } from "@/api/category";
export default {
    name: "ProductCateDetail",
    components: { SingleUpload },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            productCate: {
                name: "",
                pid: "",
                sort: "",
                picture: "",
                status: 1
            },
            selectProductCateList: [],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入分类名称",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 30,
                        message: "长度在 2 到 30 个字符",
                        trigger: "blur"
                    }
                ],
                sort: [
                    {
                        required: true,
                        message: "请填写排序",
                        trigger: "blur"
                    }
                ],
                picture: [
                    {
                        required: true,
                        message: "请上传图标",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        let id = this.$route.query.id;
        if (id) {
            this.getInfo(id);
        }
        this.getList();
    },
    methods: {
        //获取分类详情
        getInfo(id) {
            getCateInfo({ category_id: id }).then(res => {
                this.productCate = res.data;
            });
        },
        //获取分类
        getList() {
            getCateList(this.listQuery).then(res => {
                this.selectProductCateList = res.data.list;
            });
        },
        //取消
        resetForm() {
            this.$router.push("/pms/proattr");
        },
        //提交
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.updateData();
                } else {
                }
            });
        },
        //服务端提交
        updateData() {
            updateCateInfo(this.productCate).then(res => {
                this.$message.success(res.msg);
                this.$router.push("/pms/proattr");
            });
        }
    }
};
</script>