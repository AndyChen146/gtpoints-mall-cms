<template>
    <product-cate-detail :is-edit="edit"></product-cate-detail>
</template>
<script>
import ProductCateDetail from "./components/tk";
export default {
    name: "updateProductCate",
    components: { ProductCateDetail },
    data() {
        return {
            edit: true
        };
    }
};
</script>
<style>
</style>