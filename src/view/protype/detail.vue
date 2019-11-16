<template>
    <protype-detail :is-edit="edit"></protype-detail>
</template>
<script>
import protypeDetail from "./components/tk";
export default {
    name: "updateProtype",
    components: { protypeDetail },
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