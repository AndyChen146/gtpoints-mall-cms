<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>
<script>
export default {
    name: "svg-icon",
    props: {
        className: {
            type: String
        },
        iconClass: {
            type: String,
            required: true
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`;
        },
        svgClass() {
            if (this.className) {
                return "svg-icon " + this.className;
            } else {
                return "svg-icon";
            }
        }
    }
};
</script>
<style scoped>
.svg-icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.4em;
    fill: currentColor;
    overflow: hidden;
}
</style>
