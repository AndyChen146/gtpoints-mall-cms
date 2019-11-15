<template>
    <el-card class="form-container" shadow="never">
        <el-form
            :model="homeAdvertise"
            :rules="rules"
            ref="homeAdvertiseFrom"
            label-width="150px"
            size="small"
        >
            <el-form-item label="广告名称：" prop="name">
                <el-input v-model="homeAdvertise.name" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="广告位置：">
                <el-select v-model="homeAdvertise.type">
                    <el-option
                        v-for="type in typeOptions"
                        :key="type.value"
                        :label="type.label"
                        :value="type.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间：" prop="startTime">
                <el-date-picker
                    type="datetime"
                    placeholder="选择日期"
                    v-model="homeAdvertise.startTime"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间：" prop="endTime">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="homeAdvertise.endTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="上线/下线：">
                <el-radio-group v-model="homeAdvertise.status">
                    <el-radio :label="0">下线</el-radio>
                    <el-radio :label="1">上线</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="广告图片：">
                <single-upload v-model="homeAdvertise.pic"></single-upload>
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="homeAdvertise.sort" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="广告链接：" prop="url">
                <el-input v-model="homeAdvertise.url" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="广告备注：">
                <el-input
                    class="input-width"
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="homeAdvertise.note"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
                <el-button @click="resetForm()">返回</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import SingleUpload from "@/components/util/Upload/singleUpload";
const defaultTypeOptions = [
    {
        label: "大首页轮播",
        value: 0
    },
    {
        label: "商城首页轮播",
        value: 1
    }
];
export default {
    name: "HomeAdvertiseDetail",
    components: { SingleUpload },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            homeAdvertise: {
                name: "",
                type: 1,
                startTime: "",
                endTime: "",
                status: 1,
                sort: 1,
                url: "",
                note: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入广告名称",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 140,
                        message: "长度在 2 到 140 个字符",
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: "请输入广告链接",
                        trigger: "blur"
                    }
                ],
                startTime: [
                    {
                        required: true,
                        message: "请选择开始时间",
                        trigger: "blur"
                    }
                ],
                endTime: [
                    {
                        required: true,
                        message: "请选择到期时间",
                        trigger: "blur"
                    }
                ],
                pic: [
                    {
                        required: true,
                        message: "请选择广告图片",
                        trigger: "blur"
                    }
                ]
            },
            typeOptions: Object.assign({}, defaultTypeOptions)
        };
    },
    methods: {
        //返回
        resetForm() {
            this.$router.push("/sms/ad/index");
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