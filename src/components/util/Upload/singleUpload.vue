<template>
    <div>
        <el-upload
            action="/api/hub.upload/picture"
            :data="dataObj"
            list-type="picture"
            :multiple="false"
            :show-file-list="showFileList"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :http-request="uploadFile"
            accept="image/jpg, image/png, image/jpeg"
            :on-preview="handlePreview"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过5MB</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="fileList[0].url" alt />
        </el-dialog>
    </div>
</template>
<script>
import { uploadImage } from "@/api/public";

export default {
    name: "singleUpload",
    props: {
        value: String,
        cate: String
    },
    computed: {
        imageUrl() {
            return this.value;
        },
        imageName() {
            if (this.value != null && this.value !== "") {
                return this.value.substr(this.value.lastIndexOf("/") + 1);
            } else {
                return null;
            }
        },
        fileList() {
            return [
                {
                    name: this.imageName,
                    url: this.imageUrl
                }
            ];
        },
        showFileList: {
            get: function() {
                return (
                    this.value !== null &&
                    this.value !== "" &&
                    this.value !== undefined
                );
            },
            set: function(newValue) {}
        }
    },
    data() {
        return {
            dataObj: {
                url: ""
            },
            dialogVisible: false
        };
    },
    methods: {
        emitInput(val) {
            this.$emit("input", val);
        },
        handleRemove(file, fileList) {
            this.emitInput("");
        },
        handlePreview(file) {
            this.dialogVisible = true;
        },
        beforeUpload(file) {
            const isImages =
                file.type === "image/jpg" ||
                file.type === "image/png" ||
                file.type === "image/jpeg";
            const isSize = file.size / 1024 / 1024 < 5;
            if (!isImages) {
                this.$message.error("图片只能是png/jpg/jpeg后缀格式");
            }
            if (!isSize) {
                this.$message.error("图片大小不能超过5M");
            }
            return isImages && isSize;
        },
        uploadFile(params) {
            let _self = this;
            let uploadData = new FormData();
            uploadData.append("picture", params.file);
            uploadData.append("cate", this.cate);
            return new Promise((resolve, reject) => {
                uploadImage(uploadData)
                    .then(response => {
                        _self.dataObj.url = response.data.pic_url;
                        _self.showFileList = true;
                        _self.fileList.pop();
                        _self.fileList.push({
                            name: params.file.name,
                            url: _self.dataObj.url
                        });
                        _self.emitInput(_self.fileList[0].url);
                        resolve(true);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(false);
                    });
            });
        }
    }
};
</script>
<style>
</style>


