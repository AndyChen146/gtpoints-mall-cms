<template>
    <div>
        <el-upload
            action="/api/hub.upload/picture"
            :data="dataObj"
            list-type="picture-card"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :limit="maxCount"
            accept="image/jpg, image/png, image/jpeg"
            :on-preview="handlePreview"
            :on-exceed="handleExceed"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
    </div>
</template>
<script>
import { uploadImage } from "@/api/public";

export default {
    name: "singleUpload",
    props: {
        value: Array,
        //最大上传图片数量
        maxCount: {
            type: Number,
            default: 5
        }
    },
    computed: {
        fileList() {
            let fileList = [];
            for (let i = 0; i < this.value.length; i++) {
                fileList.push({ url: this.value[i] });
            }
            return fileList;
        }
    },
    data() {
        return {
            dataObj: {
                url: ""
            },
            loading: false,
            dialogVisible: false,
            dialogImageUrl: null
        };
    },
    methods: {
        emitInput(fileList) {
            let value = [];
            for (let i = 0; i < fileList.length; i++) {
                value.push(fileList[i].url);
            }
            this.$emit("input", value);
        },
        handleRemove(file, fileList) {
            this.emitInput(fileList);
        },
        handlePreview(file) {
            this.dialogVisible = true;
            this.dialogImageUrl = file.url;
        },
        beforeUpload(file) {
            const isImages =
                file.type === "image/jpg" ||
                file.type === "image/png" ||
                file.type === "image/jpeg";
            const isSize = file.size / 1024 / 1024 < 2;
            if (!isImages) {
                return this.$message.error("图片只能是png/jpg/jpeg后缀格式");
            }
            if (!isSize) {
                return this.$message.error("图片大小不能超过2M");
            }
            let _self = this;
            let uploadData = new FormData();
            uploadData.append("picture", file);
            uploadData.append("cate", "goods");
            return new Promise((resolve, reject) => {
                uploadImage(uploadData)
                    .then(response => {
                        _self.dataObj.url = response.data.pic_url;
                        _self.fileList.push({
                            name: file.name,
                            url: _self.dataObj.url
                        });
                        _self.emitInput(_self.fileList);
                        console.log(_self.fileList);
                        resolve(true);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(false);
                    });
            });
        },
        handleUploadSuccess(res, file) {},
        handleExceed(files, fileList) {
            this.$message({
                message: "最多只能上传" + this.maxCount + "张图片",
                type: "warning",
                duration: 2000
            });
        }
    }
};
</script>
<style>
</style>


