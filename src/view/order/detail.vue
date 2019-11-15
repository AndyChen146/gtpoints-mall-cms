<template>
    <div class="detail-container">
        <div>
            <el-steps :active="formatStepStatus(order.status)" finish-status="success" align-center>
                <el-step title="提交订单" :description="formatTime(order.createTime)"></el-step>
                <el-step title="支付订单" :description="formatTime(order.paymentTime)"></el-step>
                <el-step title="平台发货" :description="formatTime(order.deliveryTime)"></el-step>
                <el-step title="确认收货" :description="formatTime(order.receiveTime)"></el-step>
            </el-steps>
        </div>
        <el-card shadow="never" style="margin-top: 15px">
            <div class="operate-container">
                <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
                <span class="color-danger">当前订单状态：{{order.status | formatStatus}}</span>
            </div>
            <div style="margin-top: 20px">
                <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
                <span class="font-small">基本信息</span>
            </div>
            <div class="table-layout">
                <el-row>
                    <el-col :span="4" class="table-cell-title">订单编号</el-col>
                    <el-col :span="4" class="table-cell-title">用户账号</el-col>
                    <el-col :span="4" class="table-cell-title">支付方式</el-col>
                    <el-col :span="4" class="table-cell-title">配送方式</el-col>
                    <el-col :span="4" class="table-cell-title">物流单号</el-col>
                    <el-col :span="4" class="table-cell-title">提交时间</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4" class="table-cell-title">1</el-col>
                    <el-col :span="4" class="table-cell-title">2</el-col>
                    <el-col :span="4" class="table-cell-title">3</el-col>
                    <el-col :span="4" class="table-cell-title">4</el-col>
                    <el-col :span="4" class="table-cell-title">5</el-col>
                    <el-col :span="4" class="table-cell-title">6</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4" class="table-cell-title">自动确认收货时间</el-col>
                    <el-col :span="4" class="table-cell-title">积分</el-col>
                    <el-col :span="16" class="table-cell-title">更多信息</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4" class="table-cell-title">7</el-col>
                    <el-col :span="4" class="table-cell-title">8</el-col>
                    <el-col :span="16" class="table-cell-title">9</el-col>
                </el-row>
            </div>
            <div style="margin-top: 20px">
                <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
                <span class="font-small">收货人信息</span>
            </div>
            <div class="table-layout">
                <el-row>
                    <el-col :span="6" class="table-cell-title">收货人</el-col>
                    <el-col :span="6" class="table-cell-title">手机号码</el-col>
                    <el-col :span="6" class="table-cell-title">邮政编码</el-col>
                    <el-col :span="6" class="table-cell-title">收货地址</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="table-cell">1</el-col>
                    <el-col :span="6" class="table-cell">1</el-col>
                    <el-col :span="6" class="table-cell">1</el-col>
                    <el-col :span="6" class="table-cell">1</el-col>
                </el-row>
            </div>
            <div style="margin-top: 20px">
                <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
                <span class="font-small">商品信息</span>
            </div>
            <el-table
                ref="orderItemTable"
                :data="order.orderItemList"
                style="width: 100%;margin-top: 20px"
                border
            >
                <el-table-column label="商品图片" width="120" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.productPic" style="height: 80px" />
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.productName}}</p>
                        <p>品牌：{{scope.row.productBrand}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="价格/货号" width="120" align="center">
                    <template slot-scope="scope">
                        <p>价格：￥{{scope.row.productPrice}}</p>
                        <p>货号：{{scope.row.productSn}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="属性" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.productAttr | formatProductAttr}}</template>
                </el-table-column>
                <el-table-column label="数量" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.productQuantity}}</template>
                </el-table-column>
                <el-table-column label="小计" width="120" align="center">
                    <template
                        slot-scope="scope"
                    >￥{{scope.row.productPrice*scope.row.productQuantity}}</template>
                </el-table-column>
            </el-table>
            <div style="float: right;margin: 20px">
                合计：
                <span class="color-danger">￥{{order.totalAmount}}</span>
            </div>
        </el-card>
    </div>
</template>
<script>
import { formatdate } from "@/util/date.js";
export default {
    name: "",
    data() {
        return {
            order: {
                status: 3,
                orderItemList: []
            }
        };
    },
    created() {},
    methods: {
        formatStepStatus(value) {
            if (value === 1) {
                //待发货
                return 2;
            } else if (value === 2) {
                //已发货
                return 3;
            } else if (value === 3) {
                //已完成
                return 4;
            } else {
                //待付款、已关闭、无限订单
                return 1;
            }
        },
        formatTime(time) {
            if (time == null || time === "") {
                return "";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    filters: {
        formatStatus(value) {
            if (value === 1) {
                return "待发货";
            } else if (value === 2) {
                return "已发货";
            } else if (value === 3) {
                return "已完成";
            } else if (value === 4) {
                return "已关闭";
            } else if (value === 5) {
                return "无效订单";
            } else {
                return "待付款";
            }
        }
    }
};
</script>
<style scoped>
.detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
}

.operate-container {
    background: #f2f6fc;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
}

.operate-button-container {
    float: right;
    margin-right: 20px;
}

.table-layout {
    margin-top: 20px;
    border-left: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;
}

.table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
}

.table-cell-title {
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    padding: 10px;
    background: #f2f6fc;
    text-align: center;
    font-size: 14px;
    color: #303133;
}
</style>