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
        value: String,
        default: ""
    },
    computed: {
        content: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        }
    },
    data() {
        return {
            loading: false,
            customToolbar: [
                //更多工具栏选项在下面
                [{ header: [false, 1, 2, 3, 4, 5, 6] }],
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