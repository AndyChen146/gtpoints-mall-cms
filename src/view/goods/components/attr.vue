<template>
    <div>
        <el-row :gutter="20" class="elrow">
            <el-col :span="3" class="left-name">
                <i>*</i> 商品类型：
            </el-col>
            <el-col :span="10">
                <el-select placeholder="请选择类型">
                    <el-option :value="1">耐克</el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "GoodsAttr"
};
</script>
<style lang="scss" scoped>
.bottom {
    position: absolute;
    left: 200px;
    top: 100%;
    margin-bottom: 20px;
}
.elrow {
    margin-bottom: 20px;
}
.left-radio {
    margin-top: 13px;
}
.left-name {
    line-height: 40px;
    text-align: right;
    i {
        color: red;
        margin-right: 5px;
        display: inline-block;
    }
}
</style>