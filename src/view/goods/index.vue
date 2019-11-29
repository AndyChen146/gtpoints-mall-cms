<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span style="margin-left:10px">筛选搜索</span>
                <el-button
                    style="float: right"
                    @click="handleSearchList()"
                    type="primary"
                    size="small"
                >查询结果</el-button>
                <el-button
                    style="float: right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small"
                >重置</el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input
                            style="width: 203px"
                            v-model="listQuery.keyword"
                            placeholder="商品名称"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类：">
                        <el-cascader
                            clearable
                            v-model="selectProductCateValue"
                            :options="productCateOptions"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="商品品牌：">
                        <el-select v-model="listQuery.brandId" placeholder="请选择品牌" clearable>
                            <el-option
                                v-for="item in brandOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上架状态：">
                        <el-select v-model="listQuery.publishStatus" placeholder="全部" clearable>
                            <el-option
                                v-for="item in publishStatusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span style="margin-left:10px">数据列表</span>
            <el-button class="btn-add" @click="handleAddProduct()" size="mini">添加</el-button>
        </el-card>
        <div class="table-container">
            <el-table
                ref="productTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
            >
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="商品图片" width="160" align="center">
                    <template slot-scope="scope">
                        <img style="height: 80px" :src="scope.row.pic" />
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.name}}</p>
                        <p>品牌：{{scope.row.brandName}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="价格/货号" width="140" align="center">
                    <template slot-scope="scope">
                        <p>价格：￥{{scope.row.price}}</p>
                        <p>货号：{{scope.row.productSn}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="标签" width="140" align="center">
                    <template slot-scope="scope">
                        <p>
                            上架：
                            <el-switch
                                @change="handlePublishStatusChange(scope.$index, scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.status"
                            ></el-switch>
                        </p>
                        <p>
                            积分夺宝：
                            <el-switch
                                @change="handleNewStatusChange(scope.$index, scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.newStatus"
                            ></el-switch>
                        </p>
                        <p>
                            限时抢购：
                            <el-switch
                                @change="handleRecommendStatusChange(scope.$index, scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.recommandStatus"
                            ></el-switch>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="排序" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.sort}}</template>
                </el-table-column>
                <el-table-column label="库存" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.kc}}</template>
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <p>
                            <el-button
                                size="mini"
                                @click="handleShowProduct(scope.$index, scope.row)"
                            >查看</el-button>
                            <el-button
                                size="mini"
                                @click="handleShowAssess(scope.$index, scope.row)"
                            >评价</el-button>
                            <el-button
                                size="mini"
                                @click="handleUpdateProduct(scope.$index, scope.row)"
                            >编辑</el-button>
                        </p>
                        <p>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-container">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :page-size="listQuery.size"
                :page-sizes="[5,10,20]"
                :current-page.sync="listQuery.page"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import { getGoodsList } from "@/api/goods";
export default {
    name: "",
    data() {
        return {
            listLoading: false,
            total: 100,
            list: [
                {
                    id: 1,
                    pic: "",
                    name: "商品名称",
                    brandName: "品牌",
                    price: "10.00",
                    productSn: "201020033",
                    publishStatus: 1,
                    newStatus: 1,
                    recommandStatus: 1,
                    sort: 1,
                    sale: 10,
                    kc: 10
                }
            ],
            listQuery: {
                page: 1,
                size: 10,
                keyword: "",
                brandId: "",
                status: ""
            },
            selectProductCateValue: null, //初始化商品分类值
            productCateOptions: [], //商品分类数组
            brandOptions: [], //商品品牌数组
            publishStatusOptions: [
                {
                    value: 1,
                    label: "上架"
                },
                {
                    value: 0,
                    label: "下架"
                }
            ]
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //获取商品列表
        getList() {
            getGoodsList(this.listQuery).then(res => {
                console.log(res);
            });
        },

        //搜索查询
        handleSearchList() {},
        // 重置
        handleResetSearch() {},

        //添加商品
        handleAddProduct() {
            this.$router.push("/pms/product/add");
        },
        //商品上下架状态事件
        handlePublishStatusChange(index, obj) {},
        //商品积分夺宝状态事件
        handleNewStatusChange(index, obj) {},
        //商品限时抢购状态事件
        handleRecommendStatusChange(index, obj) {},
        handleSelectionChange() {},
        //商品查看
        handleShowProduct(index, obj) {},
        //商品编辑
        handleUpdateProduct(index, obj) {},
        //商品删除
        handleDelete(index, obj) {},
        //商品评价
        handleShowAssess(index, obj) {
            this.$router.push("/pms/product/assess?id=" + obj.goods_id);
        },

        //[5.10.20]切换
        handleSizeChange(val) {
            console.log(val);
        },
        //翻页切换
        handleCurrentChange(val) {
            console.log(val);
        }
    }
};
</script>
<style lang="scss" scoped>
</style>