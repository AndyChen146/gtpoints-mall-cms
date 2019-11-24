<template>
    <div>
        <el-row :gutter="20" class="elrow">
            <el-col :span="3" class="left-name">商品类型：</el-col>
            <el-col :span="10">
                <el-select placeholder="请选择类型" @change="onchangeType" v-model="goods_type.id">
                    <el-option value="0" label="请选择商品类型"></el-option>
                    <el-option
                        v-for="item in typelist"
                        :value="item.gt_id"
                        :key="item.gt_id"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="elrow" style="border-bottom: 1px solid #f2f2f2">
            <el-col :span="3" class="left-name">
                <i></i> 商品属性：
            </el-col>
        </el-row>
        <el-row :gutter="20" class="elrow">
            <el-table :data="goods_type_list" border style="width: 100%">
                <el-table-column width="200" align="center" label="属性名">
                    <template slot-scope="scope">{{scope.row.gtv_name}}</template>
                </el-table-column>
                <el-table-column label="属性值">
                    <template slot-scope="scope">
                        <el-input
                            v-if="scope.row.gtv_type===1"
                            v-model="scope.row.gtv_value"
                            placeholder="请输入内容"
                        ></el-input>
                        <el-radio-group v-model="scope.row.gtv_value" v-if="scope.row.gtv_type===2">
                            <el-radio
                                v-for="item in scope.row.gtv_items"
                                :label="item"
                                :key="item"
                            >{{item}}</el-radio>
                        </el-radio-group>
                        <el-checkbox-group
                            v-model="scope.row.gtv_value"
                            v-if="scope.row.gtv_type===3"
                        >
                            <el-checkbox
                                v-for="item in scope.row.gtv_items"
                                :label="item"
                                :key="item"
                            ></el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>
<script>
import { getProtypeList, getProtypeInfo } from "@/api/protype";
export default {
    name: "GoodsAttr",
    props: {
        values: Object
    },
    data() {
        return {
            goods_type: {
                id: "",
                items: ""
            },
            typelist: [],
            goods_type_list: []
        };
    },
    created() {
        this.getProType();
    },
    methods: {
        getProType() {
            getProtypeList({
                status: 1,
                page: 1,
                size: 200
            }).then(res => {
                this.typelist = res.data.list;
            });
        },
        //选择商品类型时
        onchangeType(value) {
            if (value == 0) {
                this.goods_type_list = [];
            } else {
                this.getTypeInfo(value);
            }
        },
        //获取商品类型详情
        getTypeInfo(id) {
            getProtypeInfo({ gt_id: id }).then(res => {
                let rs = res.data.items;
                if (rs && rs.length > 0) {
                    let array_items = [];
                    rs.forEach(item => {
                        if (item.type == 1) {
                            var obj = {
                                gtv_id: item.gtv_id,
                                gtv_name: item.name,
                                gtv_type: item.type,
                                gtv_items: item.value,
                                gtv_value: item.value,
                                sort: item.sort
                            };
                        } else if (item.type === 2) {
                            var obj = {
                                gtv_id: item.gtv_id,
                                gtv_name: item.name,
                                gtv_type: item.type,
                                gtv_items: item.value.split(","),
                                gtv_value: item.value.split(",")[0],
                                sort: item.sort
                            };
                        } else if (item.type === 3) {
                            var obj = {
                                gtv_id: item.gtv_id,
                                gtv_name: item.name,
                                gtv_type: item.type,
                                gtv_items: item.value.split(","),
                                gtv_value: item.value.split(","),
                                sort: item.sort
                            };
                        }
                        array_items.push(obj);
                    });
                    this.goods_type_list = array_items;
                    this.goods_type.items = this.goods_type_list;
                }
                //this.goods_type_list = res.data.items;
            });
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