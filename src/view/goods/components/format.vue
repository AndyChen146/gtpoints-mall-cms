<template>
    <div>
        <el-row :gutter="20" class="elrow">
            <el-col :span="3" class="left-name">商品规格：</el-col>
            <el-col :span="14">
                <el-select placeholder="请选择规格" @change="onchangeFormat" v-model="goods_spec_id">
                    <el-option
                        v-for="item in formatlist"
                        :value="item.spec_id"
                        :key="item.spec_id"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col class="format-del" :span="2" v-if="goods_spec.goods_spec_items.length>0">
                <el-button type="primary" @click="refreshSkuList">
                    <i class="el-icon-refresh"></i> 刷新SKU列表
                </el-button>
            </el-col>
        </el-row>
        <el-row
            v-for="(item,index) in goods_spec.goods_spec_items"
            :key="item.spec_id"
            :gutter="20"
            class="elrow format"
            style="border: 1px solid #f2f2f2"
        >
            <el-col :span="3" class="left-name">{{item.name}}：</el-col>
            <el-col :span="10">
                <el-checkbox-group v-model="item.value" @change="checkboxValue(index)">
                    <el-checkbox
                        v-for="(vx,vindex) in item.values"
                        :value="vindex"
                        :key="vindex"
                        :label="vx.spec_value_name"
                    ></el-checkbox>
                </el-checkbox-group>
            </el-col>
            <el-col class="format-del" :span="2">
                <el-button size="mini" @click="delSpecItems(index)">删除</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="elrow">
            <el-table
                style="width: 100%;margin-top: 20px;"
                height="500"
                :data="goods_spec.goods_sku_items"
                border
            >
                <el-table-column
                    v-for="(item,index) in goods_spec.goods_spec_items"
                    :label="item.name"
                    :key="item.id"
                    align="center"
                >
                    <template slot-scope="scope">{{getProductSkuSp(scope.row,index)}}</template>
                </el-table-column>
                <el-table-column label="原价" width="140" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.price" placeholder="必填"></el-input>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="促销价" width="140" align="center" style="display:none">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.promote_price" placeholder="必填"></el-input>
                    </template>
                </el-table-column>-->
                <el-table-column label="库存" width="140" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.stock" placeholder="必填"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="商家编码" width="200" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.merchant_code" placeholder="选填"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="图片" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            v-if="scope.row.picture.length<=1"
                            @click="uploadImg(scope.row, scope.$index)"
                            class="scope_btn"
                        >上传</el-button>
                        <el-button
                            type="text"
                            v-if="scope.row.picture.length>1"
                            @click="viewProductImg(scope.row.picture,scope.$index)"
                            class="scope_btn"
                        >查看</el-button>
                        <el-button
                            type="text"
                            v-if="scope.row.picture.length>1"
                            @click="delProductImg(scope.row.picture,scope.$index)"
                            class="scope_btn"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog :visible.sync="dialogVisibleBool" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <uploadImage ref="tk" :pas="goodsImagesItem" @uploadFun="getuploadFun"></uploadImage>
    </div>
</template>
<script>
import uploadImage from "./uploadImage.vue";
import { getFormatList, getFormatInfo } from "@/api/format";
export default {
    name: "GoodsFormat",
    components: {
        uploadImage
    },
    props: {
        value: Object
    },
    computed: {
        goods_spec: {
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
            // goods_spec: {
            //     goods_spec_items: [],
            //     goods_spec_picture_items: [],
            //     goods_sku_items: []
            // },
            goods_spec_id: "",
            formatlist: [],
            skuStockList: [],
            selectProductAttr: [],
            dialogImageUrl: "",
            dialogVisibleBool: false,
            goodsImagesItem: {
                item: "",
                index: ""
            }
        };
    },
    created() {
        this.getFormats();
    },
    methods: {
        //获取商品规格列表
        getFormats() {
            getFormatList({
                page: 1,
                size: 1000,
                status: 1
            }).then(res => {
                this.formatlist = res.data.list;
            });
        },
        //商品规格选择
        onchangeFormat(value) {
            this.goods_spec_id = value;
            if (this.goods_spec.goods_spec_items.length > 0) {
                for (
                    var i = 0;
                    i < this.goods_spec.goods_spec_items.length;
                    i++
                ) {
                    if (this.goods_spec.goods_spec_items[i].spec_id == value) {
                        this.$message.error("请勿添加相同的规格");
                        return false;
                    }
                }
            }
            if (this.goods_spec.goods_spec_items.length >= 3) {
                return this.$message.error("单个商品最多只能添加3个规格");
            }
            getFormatInfo({ spec_id: value }).then(res => {
                let v_items = res.data.spec_value_name.split(",");
                let v_items_array = [];
                v_items.forEach((item, index) => {
                    let abs = {
                        spec_value_name: item,
                        spec_value_id: index
                    };
                    v_items_array.push(abs);
                });
                let obj = {
                    name: res.data.name,
                    spec_id: res.data.spec_id,
                    value: v_items,
                    values: v_items_array
                };
                this.goods_spec.goods_spec_items.push(obj);
            });
        },
        //删除选择规格
        delSpecItems(index) {
            this.$confirm("此操作删除该选中规格, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.goods_spec.goods_spec_items.splice(index, 1);
                })
                .catch(() => {});
        },
        checkboxValue(index) {
            //console.log(index);
            // console.log(this.goods_spec.goods_spec_items[index]);
        },
        getProductSkuSp(row, index) {
            if (index === 0) {
                return row.sp0;
            } else if (index === 1) {
                return row.sp1;
            } else {
                return row.sp2;
            }
        },
        //刷新sku列表
        refreshSkuList() {
            if (
                this.goods_spec.goods_sku_items &&
                this.goods_spec.goods_sku_items.length > 0
            ) {
                this.$confirm(
                    "刷新列表将导致sku信息重新生成，如要刷新提前做好备份！, 是否继续?",
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                    .then(() => {
                        this.refreshProductSkuList();
                    })
                    .catch(() => {});
            } else {
                this.refreshProductSkuList();
            }
        },
        refreshProductSkuList() {
            this.goods_spec.goods_sku_items = [];
            let skuList = this.goods_spec.goods_sku_items;
            let list = this.goods_spec.goods_spec_items;
            //只有一个属性时
            if (list.length === 1) {
                let values = list[0].value;
                let names = list[0].name;
                let spec_id = list[0].spec_id;
                for (let i = 0; i < values.length; i++) {
                    skuList.push({
                        sku_name: "",
                        attr_value_items: spec_id + ":" + i,
                        sku_name: names + ":" + values[i],
                        price: "0.00",
                        promote_price: "0.00",
                        stock: "0",
                        merchant_code: "",
                        picture: "",
                        sp0: values[i]
                    });
                }
            } else if (list.length === 2) {
                let values0 = list[0].value;
                let values1 = list[1].value;
                let names0 = list[0].name;
                let spec_id0 = list[0].spec_id;
                let names1 = list[1].name;
                let spec_id1 = list[1].spec_id;
                for (let i = 0; i < values0.length; i++) {
                    if (values1.length === 0) {
                        skuList.push({
                            sku_name: "",
                            attr_value_items: spec_id0 + ":" + i,
                            sku_name: names0 + ":" + values0[i],
                            price: "0.00",
                            promote_price: "0.00",
                            stock: "0",
                            picture: "",
                            merchant_code: "",
                            sp0: values0[i]
                        });
                        continue;
                    }
                    for (let j = 0; j < values1.length; j++) {
                        skuList.push({
                            sku_name: "",
                            attr_value_items: "",
                            attr_value_items:
                                spec_id0 + ":" + i + ";" + spec_id1 + ":" + j,
                            sku_name:
                                names0 +
                                ":" +
                                values0[i] +
                                ";" +
                                names1 +
                                ":" +
                                values1[j],
                            price: "0.00",
                            promote_price: "0.00",
                            stock: "0",
                            picture: "",
                            merchant_code: "",
                            sp0: values0[i],
                            sp1: values1[j]
                        });
                    }
                }
            } else {
                let values0 = list[0].value;
                let names0 = list[0].name;
                let spec_id0 = list[0].spec_id;
                let values1 = list[1].value;
                let names1 = list[1].name;
                let spec_id1 = list[1].spec_id;
                let values2 = list[2].value;
                let names2 = list[2].name;
                let spec_id2 = list[2].spec_id;
                for (let i = 0; i < values0.length; i++) {
                    if (values1.length === 0) {
                        skuList.push({
                            sku_name: "",

                            attr_value_items: spec_id0 + ":" + i,
                            sku_name: names0 + ":" + values0[i],

                            price: "0.00",
                            promote_price: "0.00",
                            stock: "0",
                            picture: "",
                            merchant_code: "",
                            sp0: values0[i]
                        });
                        continue;
                    }
                    for (let j = 0; j < values1.length; j++) {
                        if (values2.length === 0) {
                            skuList.push({
                                sku_name: "",
                                attr_value_items:
                                    spec_id0 +
                                    ":" +
                                    i +
                                    ";" +
                                    spec_id1 +
                                    ":" +
                                    j,
                                sku_name:
                                    names0 +
                                    ":" +
                                    values0[i] +
                                    ";" +
                                    names1 +
                                    ":" +
                                    values1[j],

                                price: "0.00",
                                promote_price: "0.00",
                                stock: "0",
                                picture: "",
                                merchant_code: "",
                                sp0: values0[i],
                                sp1: values1[j]
                            });
                            continue;
                        }
                        for (let k = 0; k < values2.length; k++) {
                            skuList.push({
                                sku_name: "",
                                attr_value_items:
                                    spec_id0 +
                                    ":" +
                                    i +
                                    ";" +
                                    spec_id1 +
                                    ":" +
                                    j +
                                    ";" +
                                    spec_id2 +
                                    ":" +
                                    k,
                                sku_name:
                                    names0 +
                                    ":" +
                                    values0[i] +
                                    ";" +
                                    names1 +
                                    ":" +
                                    values1[j] +
                                    ";" +
                                    names2 +
                                    ":" +
                                    values2[k],
                                price: "0.00",
                                promote_price: "0.00",
                                stock: "0",
                                picture: "",
                                merchant_code: "",
                                sp0: values0[i],
                                sp1: values1[j],
                                sp2: values2[k]
                            });
                        }
                    }
                }
            }
        },
        //sku 图片上传
        uploadImg(obj, index) {
            this.goodsImagesItem.item = obj;
            this.goodsImagesItem.index = index;
            this.$refs.tk.openDialog();
        },
        // 查看sku商品属性对应的图片
        viewProductImg(url, index) {
            this.dialogImageUrl = url;
            this.dialogVisibleBool = true;
        },
        // 删除商品属性对应的图片
        delProductImg(url, index) {
            this.$confirm("确定删除上传好的商品属性图片？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.goods_spec.goods_sku_items[index].imgurl = "";
            });
        },
        //接收商品属性上传图片的数据
        getuploadFun(data) {
            //this.tableData[data.index].imgurl = data.imageUrl;
            this.goods_spec.goods_sku_items[data.index].picture = data.imageUrl;
        }
    }
};
</script>
<style lang="scss" scoped>
.format {
    .left-name {
        font-size: 14px;
    }
    .format-del {
        float: right;
        margin-top: 6px;
    }
    /deep/ .el-checkbox__label {
        font-size: 12px;
    }
    /deep/ .el-checkbox-group {
        margin-top: 12px;
    }
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