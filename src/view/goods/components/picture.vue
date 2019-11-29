<template>
    <div>
        <div class="images flex flex-wrap">
            <el-upload
                class="flex-item"
                action="/api/hub.upload/picture"
                multiple
                :show-file-list="false"
                accept="image/*"
                v-loading="loading"
                :on-progress="uploading"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile"
            >
                <div class="upload-btn">
                    <img src="@/assets/images/add.png" />
                </div>
            </el-upload>
            <div class="img-wrap relative flex-item" v-for="(item,index) in images" :key="index">
                <img :src="item" />
                <div class="operate">
                    <a class="float-right" @click="deletePic(index)">删除图片</a>
                </div>
            </div>
        </div>
        <div slot="tip" class="el-upload__tip">按住ctrl可同时批量选择多张图片上传，最多可以上传5张图片，建议尺寸800*800px</div>
    </div>
</template>
<script>
import { uploadImage } from "@/api/public";
export default {
    name: "GoodsPicture",
    props: {
        value: Array,
        default: []
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        images: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        }
    },
    methods: {
        uploading() {
            this.loading = true;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpg";
            const isJPEG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isGIF = file.type === "image/gif";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isJPEG && !isPNG && isGIF) {
                this.$message.closeAll();
                this.$message.error("图片只能是 JPG/png/jpeg/gif格式!");
            }
            if (!isLt2M) {
                this.$message.closeAll();
                this.$message.error("图片大小不能超过 2MB!");
            }
            if (this.images.length >= 5) {
                this.$message.closeAll();
                return this.$message.error("最多只能上传5张");
            }
            return (isJPG || isJPEG || isPNG || isGIF) && isLt2M;
        },
        uploadFile(params) {
            let _self = this;
            let uploadData = new FormData();
            uploadData.append("picture", params.file);
            uploadData.append("cate", "goods");
            return new Promise((resolve, reject) => {
                uploadImage(uploadData)
                    .then(response => {
                        _self.loading = false;
                        if (_self.images.length < 5) {
                            _self.images.push(response.data.pic_url);
                        }
                        resolve(true);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(false);
                    });
            });
        },
        deletePic(index) {
            this.images.splice(index, 1);
        }
    }
};
</script>
<style  lang="scss" scoped>
.images {
    justify-content: left;
    display: flex;
    flex-wrap: wrap;
}
.flex-item {
    margin-right: 19px;

    &:last-child {
        margin-right: 0px;
    }
}
.img-wrap {
    border: 1px solid rgba(204, 204, 204, 1);

    width: 200px;
    height: 200px;
    position: relative;
    background: url(~@/assets/images/border.png) no-repeat center;

    i {
        position: absolute;
    }
}

.img-wrap {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 4px;

    &:first-child {
        margin-left: 0px;
    }

    &:last-child {
        margin-right: 0px;
    }
    img {
        width: 200px;
        height: 200px;
    }
    .operate {
        position: absolute;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background: rgba(0, 0, 0, 0.5);
        bottom: 0px;
        width: 100%;
        height: 32px;
        line-height: 32px;

        a {
            padding: 0px 12px;
            font-size: 13px;
        }
    }
}

.upload-btn {
    width: 200px;
    height: 200px;
    background: url(~@/assets/images/bg.png) no-repeat center;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    div {
        line-height: 14px;
    }
}
</style>