<template>
    <format-detail :is-edit="edit"></format-detail>
</template>
<script>
import formatDetail from "./components/tk";
export default {
    name: "updateFormat",
    components: { formatDetail },
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