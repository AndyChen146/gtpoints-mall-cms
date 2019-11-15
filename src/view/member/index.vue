<template>
    <el-card class="form-container" shadow="never">
        <el-form :model="memberInfo" ref="memberInfoForm" :rules="rules" label-width="150px">
            <el-form-item label="手机号：">
                <el-input v-model="memberInfo.iphone" readonly class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="用户名：" prop="name">
                <el-input v-model="memberInfo.name" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input v-model="memberInfo.password" type="password" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址：">
                <el-input v-model="memberInfo.email" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="头像：" prop="logo">
                <single-upload v-model="memberInfo.logo"></single-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="confirm('memberInfoForm')" type="primary">提交</el-button>
                <el-button @click="backhome">返回首页</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import SingleUpload from "@/components/util/Upload/singleUpload";
export default {
    name: "memberIndex",
    components: { SingleUpload },
    data() {
        return {
            memberInfo: {
                iphone: "13512121212",
                password: "123",
                name: "",
                email: "",
                logo: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 140,
                        message: "长度在 2 到 140 个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {},
    methods: {
        //提交
        confirm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                } else {
                }
            });
        },
        backhome() {
            this.$router.push("/home");
        }
    }
};
</script>
<style lang="scss" scoped>
</style>