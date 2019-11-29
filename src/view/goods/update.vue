<template>
    <div class="app-container">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="基础设置" name="first">
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i> 商品名称：
                    </el-col>
                    <el-col :span="10">
                        <el-input
                            v-model="params.title"
                            maxlength="100"
                            placeholder="请输入商品名称，不得超过100个字符"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i> 商品分类：
                    </el-col>
                    <el-col :span="10">
                        <el-select placeholder="请选择分类" v-model="params.category_id">
                            <el-option
                                v-for="item in categorys"
                                :value="item.category_id"
                                :label="item.name"
                                :key="item.category_id"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i> 商品品牌：
                    </el-col>
                    <el-col :span="10">
                        <el-select placeholder="请选择品牌" v-model="params.brand_id">
                            <el-option
                                v-for="item in brands"
                                :value="item.brand_id"
                                :key="item.brand_id"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i>商品单价：
                    </el-col>
                    <el-col :span="10">
                        <el-input
                            v-model="params.price"
                            oninput="value=value.replace(/[^\d.]/g,'')"
                            placeholder="请输入商品单价，如填写商品规格，以规格价格为主！"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i>商品库存：
                    </el-col>
                    <el-col :span="10">
                        <el-input
                            v-model.number="params.stock"
                            placeholder="请输入商品库存，如填写商品规格，以规格库存为主！"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">
                        <i>*</i>是否上架：
                    </el-col>
                    <el-col :span="10">
                        <el-radio-group class="left-radio" v-model="params.status">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">商品促销语：</el-col>
                    <el-col :span="10">
                        <el-input
                            v-model="params.introduction"
                            maxlength="150"
                            placeholder="请输入商品促销语，不得超过150个字符"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">关键词：</el-col>
                    <el-col :span="10">
                        <el-input
                            v-model="params.keywords"
                            maxlength="150"
                            placeholder="请输入商品关键词，不得超过150个字符"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">商品编码：</el-col>
                    <el-col :span="10">
                        <el-input
                            v-model="params.merchant_code"
                            maxlength="25"
                            placeholder="请输入商品编码，不得超过25个字符"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">商品重量：</el-col>
                    <el-col :span="10">
                        <el-input
                            oninput="value=value.replace(/[^\d.]/g,'')"
                            v-model="params.weight"
                            placeholder="请输入重量，单位：kg"
                            maxlength="8"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">商品单位：</el-col>
                    <el-col :span="10">
                        <el-input
                            v-model="params.goods_unit"
                            maxlength="1"
                            placeholder="请输入商品单位，单个字概述，例如：件，套.."
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="elrow">
                    <el-col :span="3" class="left-name">排序：</el-col>
                    <el-col :span="10">
                        <el-input v-model.number="params.sort" placeholder="请输入排序"></el-input>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="second">
                <goods-attr v-model="goods_type"></goods-attr>
            </el-tab-pane>
            <el-tab-pane label="商品规格" name="third">
                <goods-format v-model="goods_spec"></goods-format>
            </el-tab-pane>
            <el-tab-pane label="商品相册" name="fourth">
                <goods-picture v-model="picture"></goods-picture>
            </el-tab-pane>
            <el-tab-pane label="商品详情" name="five">
                <goods-detail v-model="params.description"></goods-detail>
            </el-tab-pane>
        </el-tabs>
        <div class="bottom">
            <el-row>
                <el-button type="primary" @click="submitSave">保存</el-button>
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
import MultiUpload from "@/components/util/Upload/multiUpload";

import { getBrandsList } from "@/api/brand";
import { getCateList } from "@/api/category";
import { updataGoods } from "@/api/goods";

export default {
    name: "",
    components: {
        GoodsAttr,
        GoodsFormat,
        GoodsPicture,
        GoodsDetail,
        MultiUpload
    },
    data() {
        return {
            goods_spec: {
                goods_spec_items: [],
                goods_sku_items: []
            },
            goods_type: {
                goods_type_id: "",
                goods_type_items: []
            },
            picture: [],
            params: {
                title: "",
                merchant_code: "",
                category_id: "",
                brand_id: "",
                price: "",
                stock: "",
                keywords: "",
                introduction: "",
                description: "",
                goods_type_id: "",
                goods_type_items: "",
                status: 1,
                weight: "",
                goods_unit: "",
                picture: [],
                goods_spec_items: "",
                goods_sku_items: "",
                sort: ""
            },
            activeName: "first",
            brands: [],
            categorys: []
        };
    },
    created() {
        this.getBrands();
        this.getCates();
    },
    methods: {
        //获取品牌
        getBrands() {
            getBrandsList({
                page: 1,
                size: 1000,
                status: 1
            }).then(res => {
                this.brands = res.data.list;
            });
        },
        //获取分类列表
        getCates() {
            getCateList().then(res => {
                this.categorys = res.data.list;
            });
        },
        //提交保存
        submitSave() {
            if (this.params.title == "") {
                this.$message.closeAll();
                return this.$message.error("商品名称不能为空！");
            } else if (this.params.category_id == "") {
                this.$message.closeAll();
                return this.$message.error("请选择商品分类！");
            } else if (this.params.brand_id == "") {
                this.$message.closeAll();
                return this.$message.error("请选择商品品牌！");
            } else if (this.params.price == "") {
                this.$message.closeAll();
                return this.$message.error("商品单价不能为空！");
            } else if (this.params.stock == "") {
                this.$message.closeAll();
                return this.$message.error("商品库存不能为空！");
            } else if (this.picture.length == 0) {
                this.$message.closeAll();
                return this.$message.error("请至少上传一张商品相册图片！");
            } else if (this.params.description == "") {
                this.$message.closeAll();
                return this.$message.error("商品详情不能为空！");
            } else if (
                this.goods_spec.goods_spec_items.length > 0 &&
                this.goods_spec.goods_sku_items.length == 0
            ) {
                this.$message.closeAll();
                return this.$message.error("未刷新SKU列表！");
            }
            for (var i in this.goods_spec.goods_sku_items) {
                var tableSkuItem = this.goods_spec.goods_sku_items[i];
                for (var key in tableSkuItem) {
                    if (tableSkuItem["price"] == "") {
                        this.$message.closeAll();
                        return this.$message.error("SKU列表中的原价不能为空！");
                        break;
                    } else if (tableSkuItem["stock"] == "") {
                        this.$message.closeAll();
                        return this.$message.error("SKU列表中的库存不能为空！");
                        break;
                    } else if (tableSkuItem["picture"] == "") {
                        this.$message.closeAll();
                        return this.$message.error("SKU列表中的图片不能为空！");
                        break;
                    }
                }
            }
            let goods_type_items = [];
            this.goods_type.goods_type_items.forEach(element => {
                if (element.gtv_type === 3) {
                    element.gtv_value = element.gtv_value.join(",");
                }
                goods_type_items.push(element);
            });

            this.params.goods_type_id = this.goods_type.goods_type_id;
            this.params.goods_type_items = goods_type_items;
            this.params.picture = this.picture.join(",");
            this.params.goods_sku_items = this.goods_spec.goods_sku_items;
            this.params.goods_spec_items = this.goods_spec.goods_spec_items;

            if (this.$route.query.id) {
                this.params.goods_id = this.$route.query.id;
                //console.log(this.params);
                this.submitAjax(this.params);
            } else {
                this.submitAjax(this.params);
                //console.log(this.params);
            }
        },
        //服务端提交
        submitAjax(obj) {
            updataGoods(obj).then(res => {
                console.log(res);
                // this.$message.success("操作成功！")
                // this.$router.push('/pms/product')
            });
        },

        handleClick(tab, event) {
            //console.log(tab, event);
        }
    }
};
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__content {
    min-height: 300px;
}
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