<template>
    <el-card class="form-container" shadow="never">
        <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
            <el-form-item label="规格名称：" prop="name">
                <el-input v-model="brand.name"></el-input>
            </el-form-item>
            <el-form-item label="规格排序：" prop="sort">
                <el-input v-model.number="brand.sort"></el-input>
            </el-form-item>
            <el-form-item label="展示方式：">
                <el-radio-group v-model="brand.show_type">
                    <el-radio :label="1">文字</el-radio>
                    <el-radio :label="2">颜色</el-radio>
                    <el-radio :label="3">图片</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否显示：">
                <el-radio-group v-model="brand.status">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="规格值：" prop="items">
                <el-input v-model.number="brand.items"></el-input>
                <span style="margin-left:10px;font-size:12px;color:#999">多个以,分隔</span>
            </el-form-item>
            <el-form-item label="规格说明：" prop="spec_des">
                <el-input v-model.number="brand.spec_des"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
                <el-button @click="resetForm()">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import { getFormatInfo, updateFormat } from "@/api/format";
export default {
    name: "formatDetail",
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            brand: {
                items: "",
                spec_des: "",
                show_type: 1,
                name: "",
                status: 1,
                sort: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入规格名称",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 140,
                        message: "长度在 2 到 140 个字符",
                        trigger: "blur"
                    }
                ],
                items: [
                    {
                        required: true,
                        message: "请填写规格值",
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
            getFormatInfo({ spec_id: id }).then(res => {
                this.brand.name = res.data.name;
                this.brand.show_type = res.data.show_type;
                this.brand.sort = res.data.sort;
                this.brand.spec_des = res.data.spec_des;
                this.brand.spec_id = res.data.spec_id;
                this.brand.status = res.data.status;
                this.brand.items = res.data.spec_value_name;
            });
        },
        //取消
        resetForm() {
            this.$router.push("/pms/format");
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
            updateFormat(this.brand).then(res => {
                this.$message.success(res.msg);
                this.$router.push("/pms/format");
            });
        }
    }
};
</script>