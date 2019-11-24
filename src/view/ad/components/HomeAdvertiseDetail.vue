<template>
    <el-card class="form-container" shadow="never">
        <el-form
            :model="homeAdvertise"
            :rules="rules"
            ref="homeAdvertiseFrom"
            label-width="150px"
            size="small"
        >
            <el-form-item label="广告名称：" prop="title">
                <el-input v-model="homeAdvertise.title" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="广告位置：" prop="aid">
                <el-select v-model="homeAdvertise.aid">
                    <el-option
                        v-for="type in typeOptions"
                        :key="type.aid"
                        :label="type.name"
                        :value="type.aid"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间：" prop="stime">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="homeAdvertise.stime"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" prop="etime">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="homeAdvertise.etime"></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="上线/下线：">
                <el-radio-group v-model="homeAdvertise.status">
                    <el-radio :label="0">下线</el-radio>
                    <el-radio :label="1">上线</el-radio>
                </el-radio-group>
            </el-form-item>-->
            <el-form-item label="广告链接：" prop="url">
                <el-input v-model="homeAdvertise.url" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="广告图片：" prop="content">
                <single-upload v-model="homeAdvertise.content"></single-upload>
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="homeAdvertise.sort" class="input-width"></el-input>
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
import { getAdInfo, updataAdInfo, getAdTypeList } from "@/api/ad";
import { formatTime } from "@/util/datas";
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
                title: "",
                aid: "",
                stime: "",
                etime: "",
                sort: "",
                url: "",
                content: ""
            },
            rules: {
                title: [
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
                aid: [
                    {
                        required: true,
                        message: "请选择广告位",
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
                stime: [
                    {
                        required: true,
                        message: "请选择开始时间",
                        trigger: "blur"
                    }
                ],
                etime: [
                    {
                        required: true,
                        message: "请选择到期时间",
                        trigger: "blur"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "请选择广告图片",
                        trigger: "blur"
                    }
                ]
            },
            typeOptions: []
        };
    },
    created() {
        this.getAdList();
        let id = this.$route.query.id;
        if (id) {
            this.getInfo(id);
        }
    },
    methods: {
        //获取广告详情
        getInfo(id) {
            getAdInfo({ id: id }).then(res => {
                this.homeAdvertise.title = res.data.title;
                this.homeAdvertise.aid = res.data.aid;
                this.homeAdvertise.stime = formatTime(res.data.stime);
                this.homeAdvertise.etime = formatTime(res.data.etime);
                this.homeAdvertise.url = res.data.url;
                this.homeAdvertise.content = res.data.content;
                this.homeAdvertise.sort = res.data.sort;
            });
        },
        //获取广告位列表
        getAdList() {
            getAdTypeList({ page: 1, size: 100 }).then(res => {
                this.typeOptions = res.data.list;
            });
        },
        //返回
        resetForm() {
            this.$router.push("/sms/ad/index");
        },
        //提交
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.homeAdvertise.stime =
                        new Date(this.homeAdvertise.stime).getTime() / 1000;
                    this.homeAdvertise.etime =
                        new Date(this.homeAdvertise.etime).getTime() / 1000;
                    if (this.$route.query.id) {
                        this.homeAdvertise.id = this.$route.query.id;
                        this.UpdateFormData(this.homeAdvertise);
                    } else {
                        this.UpdateFormData(this.homeAdvertise);
                    }
                }
            });
        },
        //服务端数据api提交
        UpdateFormData(obj) {
            updataAdInfo(obj).then(res => {
                this.$message.success("操作成功！");
                this.$router.push("/sms/ad/index");
            });
        }
    }
};
</script>