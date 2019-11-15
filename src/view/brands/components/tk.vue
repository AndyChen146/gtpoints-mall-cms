<template>
    <el-card class="form-container" shadow="never">
        <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
            <el-form-item label="品牌名称：" prop="name">
                <el-input v-model="brand.name"></el-input>
            </el-form-item>
            <el-form-item label="品牌首字母：">
                <el-input v-model="brand.enname"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO：" prop="logo">
                <single-upload v-model="brand.logo"></single-upload>
            </el-form-item>
            <el-form-item label="品牌专区大图：">
                <single-upload v-model="brand.bigPic"></single-upload>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model.number="brand.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否显示：">
                <el-radio-group v-model="brand.showStatus">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="描述：" prop="sort">
                <el-input v-model.number="brand.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
                <el-button @click="resetForm()">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import SingleUpload from "@/components/util/Upload/singleUpload";
export default {
    name: "BrandDetail",
    components: { SingleUpload },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            brand: {
                bigPic: "",
                desc: "",
                factoryStatus: 0,
                enname: "",
                logo: "",
                name: "",
                showStatus: 0,
                sort: 0
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入品牌名称",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 140,
                        message: "长度在 2 到 140 个字符",
                        trigger: "blur"
                    }
                ],
                logo: [
                    {
                        required: true,
                        message: "请输入品牌logo",
                        trigger: "blur"
                    }
                ],
                sort: [{ type: "number", message: "排序必须为数字" }]
            }
        };
    },
    methods: {
        //取消
        resetForm() {
            this.$router.push("/pms/brand");
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