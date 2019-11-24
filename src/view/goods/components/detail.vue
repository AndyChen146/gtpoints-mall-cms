<template>
    <div>
        <div v-loading="loading" style="min-height:540px">
            <!--上传图片时得加载画面-->
            <VueEditor
                style="width: 100%;height: 480px"
                useCustomImageHandler
                @image-added="handleImageAdded"
                :editorToolbar="customToolbar"
                v-model="content"
            ></VueEditor>
        </div>
    </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import { uploadImage } from "@/api/public";
export default {
    name: "GoodsDetail",
    components: { VueEditor },
    props: {
        values: Object
    },
    data() {
        return {
            content: "",
            loading: false,
            customToolbar: [
                //更多工具栏选项在下面
                ["bold", "italic", "underline"],
                [{ align: "" }, { align: "center" }, { align: "right" }],
                [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                [{ background: [] }, { color: [] }],
                ["image", "link"],
                ["strike"],
                ["clean"]
            ]
        };
    },
    methods: {
        handleImageAdded(file, Editor, cursorLocation) {
            this.loading = true;
            let uploadData = new FormData();
            uploadData.append("picture", file);
            uploadData.append("cate", "goods");
            uploadImage(uploadData).then(res => {
                this.loading = false;
                Editor.insertEmbed(cursorLocation, "image", res.data.pic_url);
            });
        }
    }
};
</script>