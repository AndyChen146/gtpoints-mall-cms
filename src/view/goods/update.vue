<template>
    <div class="app-container">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="基础设置" name="first">
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i> 商品名称：
                    </el-col>
                    <el-col :span="10">
                        <el-input placeholder="请输入商品名称，不得超过60个字符"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i> 商品分类：
                    </el-col>
                    <el-col :span="10">
                        <el-select placeholder="请选择分类">
                            <el-option :value="1">耐克</el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i> 商品品牌：
                    </el-col>
                    <el-col :span="10">
                        <el-select placeholder="请选择品牌">
                            <el-option :value="1">耐克</el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">商品促销语：</el-col>
                    <el-col :span="10">
                        <el-input placeholder="请输入商品名称，不得超过60个字符"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">关键词：</el-col>
                    <el-col :span="10">
                        <el-input placeholder="请输入商品名称，不得超过60个字符"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">商家编码：</el-col>
                    <el-col :span="10">
                        <el-input placeholder="请输入商品名称，不得超过60个字符"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">商品重量：</el-col>
                    <el-col :span="10">
                        <el-input placeholder="请输入商品名称，不得超过60个字符"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">商品单位：</el-col>
                    <el-col :span="10">
                        <el-input placeholder="请输入商品名称，不得超过60个字符"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">排序：</el-col>
                    <el-col :span="10">
                        <el-input placeholder="请输入商品名称，不得超过60个字符"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i>总库存：
                    </el-col>
                    <el-col :span="10">
                        <el-input placeholder="请输入商品名称，不得超过60个字符"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i>是否上架：
                    </el-col>
                    <el-col :span="10">
                        <el-radio-group class="left-radio">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="second">
                <goods-attr></goods-attr>
            </el-tab-pane>
            <el-tab-pane label="商品规格" name="third">
                <goods-format></goods-format>
            </el-tab-pane>
            <el-tab-pane label="商品相册" name="fourth">
                <goods-picture></goods-picture>
            </el-tab-pane>
            <el-tab-pane label="商品详情" name="five">
                <goods-detail></goods-detail>
            </el-tab-pane>
        </el-tabs>
        <div class="bottom">
            <el-row>
                <el-button type="primary">保存</el-button>
                <el-button>返回</el-button>
            </el-row>
        </div>
    </div>
</template>
<script>
import GoodsAttr from "./components/attr.vue"; //商品属性组件
import GoodsPicture from "./components/picture.vue"; //商品相册组件
import GoodsFormat from "./components/format.vue"; //商品规格组件
import GoodsDetail from "./components/detail.vue"; //商品详情组件

export default {
    name: "",
    components: {
        GoodsAttr,
        GoodsPicture,
        GoodsFormat,
        GoodsDetail
    },
    data() {
        return {
            activeName: "first"
        };
    },
    created() {},
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
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