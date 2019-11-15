<template>
    <el-card class="form-container" shadow="never">
        <el-form :model="productCate" :rules="rules" ref="productCateFrom" label-width="150px">
            <el-form-item label="分类名称：" prop="name">
                <el-input v-model="productCate.name"></el-input>
            </el-form-item>
            <el-form-item label="上级分类：">
                <el-select v-model="productCate.parentId" placeholder="请选择分类">
                    <el-option
                        v-for="item in selectProductCateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model="productCate.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否显示：">
                <el-radio-group v-model="productCate.showStatus">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="分类图标：" prop="icon">
                <single-upload v-model="productCate.icon"></single-upload>
            </el-form-item>
            <el-form-item label="描述：">
                <el-input v-model="productCate.description"></el-input>
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
                parentId: 0,
                sort: "",
                icon: "",
                showStatus: 1,
                description: ""
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
                icon: [
                    {
                        required: true,
                        message: "请上传图标",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        //取消
        resetForm() {
            this.$router.push("/pms/proattr");
        },
        //提交
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                } else {
                }
            });
        }
    }
};
</script>