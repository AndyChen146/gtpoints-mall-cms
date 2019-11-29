<template>
    <div class="upload-box">
        <el-dialog title="上传商品图片" :visible.sync="dialogVisible" width="50%">
            <el-upload
                class="avatar-uploader"
                action="/api/hub.upload/picture"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile"
            >
                <img v-if="values.imageUrl" :src="values.imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="okBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { uploadImage } from "@/api/public";
export default {
    name: "uploadImage",
    props: ["pas"],
    data() {
        return {
            dialogVisible: false,
            values: {
                index: "",
                imageUrl: ""
            }
        };
    },
    methods: {
        openDialog() {
            this.dialogVisible = true;
        },
        // handleAvatarSuccess(res, file) {
        //     this.values.imageUrl = file.response.url;
        // },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpg";
            const isJPEG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isGIF = file.type === "image/gif";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isJPEG && !isPNG && isGIF) {
                this.$message.error("图片只能是 JPG/png/jpeg/gif格式!");
            }
            if (!isLt2M) {
                this.$message.error("图片大小不能超过 2MB!");
            }
            return (isJPG || isJPEG || isPNG || isGIF) && isLt2M;
        },
        okBtn() {
            if (this.values.imageUrl === "") {
                return this.$message.error("请选择图片");
            }
            this.$emit("uploadFun", this.values);
            this.dialogVisible = false;
        },
        uploadFile(params) {
            let _self = this;
            let uploadData = new FormData();
            uploadData.append("picture", params.file);
            uploadData.append("cate", "goods");
            return new Promise((resolve, reject) => {
                uploadImage(uploadData)
                    .then(response => {
                        _self.values.imageUrl = response.data.pic_url;
                        resolve(true);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(false);
                    });
            });
        }
    },
    watch: {
        "pas.index"(n, o) {
            this.values.index = n;
        }
    }
};
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
