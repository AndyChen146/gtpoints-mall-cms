<template>
    <el-card class="form-container" shadow="never">
        <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
            <el-form-item label="品牌名称：" prop="name">
                <el-input v-model="brand.name"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO：" prop="picture">
                <single-upload v-model="brand.picture" cate="icon"></single-upload>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model.number="brand.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐：">
                <el-radio-group v-model="brand.is_recommend">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否显示：">
                <el-radio-group v-model="brand.status">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="描述：" prop="description">
                <el-input v-model.number="brand.description"></el-input>
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
import { updateBrands, getBrandsInfo } from "@/api/brand";
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
                picture: "",
                description: "",
                is_recommend: 1,
                name: "",
                status: 1,
                sort: ""
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
                picture: [
                    {
                        required: true,
                        message: "请上传品牌logo",
                        trigger: "blur"
                    }
                ],
                sort: [{ type: "number", message: "排序必须为数字" }]
            }
        };
    },
    created() {
        let id = this.$route.query.id;
        if (id) {
            this.getInfo(id);
        }
    },
    methods: {
        //获取品牌详情
        getInfo(id) {
            getBrandsInfo({ brand_id: id }).then(res => {
                this.brand = res.data;
            });
        },
        //取消
        resetForm() {
            this.$router.push("/pms/brand");
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
        //提交数据到服务端
        updateData() {
            updateBrands(this.brand).then(res => {
                this.$message.success(res.msg);
                this.$router.push("/pms/brand");
            });
        }
    }
};
</script>