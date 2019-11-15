<template>
    <home-advertise-detail :isEdit="edit"></home-advertise-detail>
</template>
<script>
import HomeAdvertiseDetail from "./components/HomeAdvertiseDetail";
export default {
    name: "updateHomeAdvertise",
    data() {
        return {
            edit: true
        };
    },
    components: { HomeAdvertiseDetail }
};
</script>