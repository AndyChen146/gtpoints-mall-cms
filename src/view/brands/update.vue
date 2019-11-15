<template>
    <brand-detail :is-edit="edit"></brand-detail>
</template>
<script>
import BrandDetail from "./components/tk";
export default {
    name: "updateBrand",
    components: { BrandDetail },
    data() {
        return {
            edit: true
        };
    },
    created() {},
    methods: {}
};
</script>
<style lang="scss" scoped>
</style>