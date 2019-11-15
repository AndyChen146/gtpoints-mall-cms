<template>
    <div>
        <el-upload
            action
            :data="dataObj"
            list-type="picture"
            :multiple="false"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            :on-preview="handlePreview"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" src="fileList[0].url" alt />
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "singleUpload",
    props: {
        value: String
    },
    data() {
        return {
            dataObj: {},
            showFileList: [],
            fileList: [],
            dialogVisible: false
        };
    },
    methods: {
        handleRemove(file, fileList) {
            this.emitInput("");
        },
        beforeUpload(file) {
            //走api接口
        },
        handleUploadSuccess(res, file) {},
        handlePreview() {}
    }
};
</script>