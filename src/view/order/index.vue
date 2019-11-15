<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span style="margin-left:10px">筛选搜索</span>
                <el-button
                    style="float:right"
                    type="primary"
                    @click="handleSearchList()"
                    size="small"
                >查询搜索</el-button>
                <el-button
                    style="float:right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small"
                >重置</el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input
                            v-model="listQuery.orderSn"
                            class="input-width"
                            placeholder="订单编号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="收货人：">
                        <el-input
                            v-model="listQuery.receiverKeyword"
                            class="input-width"
                            placeholder="收货人姓名/手机号码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="提交时间：">
                        <el-date-picker
                            class="input-width"
                            v-model="listQuery.createTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="请选择时间"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="订单状态：">
                        <el-select
                            v-model="listQuery.status"
                            class="input-width"
                            placeholder="全部"
                            clearable
                        >
                            <el-option
                                v-for="item in statusOptions"
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
            <span>数据列表</span>
        </el-card>
        <div class="table-container">
            <el-table
                ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
            >
                <el-table-column label="编号" width="80" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="订单编号" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.orderSn}}</template>
                </el-table-column>
                <el-table-column label="提交时间" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.createTime}}</template>
                </el-table-column>
                <el-table-column label="用户账号" align="center">
                    <template slot-scope="scope">{{scope.row.memberUsername}}</template>
                </el-table-column>
                <el-table-column label="订单金额" width="120" align="center">
                    <template slot-scope="scope">￥{{scope.row.totalAmount}}</template>
                </el-table-column>
                <el-table-column label="支付方式" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.payType | formatPayType}}</template>
                </el-table-column>
                <el-table-column label="订单状态" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleViewOrder(scope.$index, scope.row)"
                        >查看订单</el-button>
                        <el-button
                            size="mini"
                            @click="handleCloseOrder(scope.$index, scope.row)"
                            v-show="scope.row.status===0"
                        >关闭订单</el-button>
                        <el-button
                            size="mini"
                            @click="handleDeliveryOrder(scope.$index, scope.row)"
                            v-show="scope.row.status===1"
                        >订单发货</el-button>
                        <el-button
                            size="mini"
                            @click="handleViewLogistics(scope.$index, scope.row)"
                            v-show="scope.row.status===2||scope.row.status===3"
                        >订单跟踪</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDeleteOrder(scope.$index, scope.row)"
                            v-show="scope.row.status===4"
                        >删除订单</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-container" style="margin-bottom:20px">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :total="total"
            ></el-pagination>
        </div>

        <el-dialog title="关闭订单" :visible.sync="closeOrder.dialogVisible" width="30%">
            <span style="vertical-align: top">操作备注：</span>
            <el-input
                style="width: 80%"
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="closeOrder.content"
            ></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="订单发货" :visible.sync="deliveryOrder.dialogVisible" width="50%">
            <el-form
                :model="deliveryOrder"
                ref="orderSettingForm"
                :rules="deliveryOrder_rules"
                label-width="140px"
            >
                <el-form-item label="订单编号：">
                    <el-input v-model="deliveryOrder.ordersn" readonly class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="收货人：">
                    <el-input v-model="deliveryOrder.username" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input v-model="deliveryOrder.iphone" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="收货地址：">
                    <el-input v-model="deliveryOrder.address" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="配送方式：" prop="deliveryCompany">
                    <el-select
                        placeholder="请选择物流公司"
                        v-model="deliveryOrder.deliveryCompany"
                        size="small"
                    >
                        <el-option
                            v-for="item in companyOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物流单号：" prop="deliverySn">
                    <el-input v-model="deliveryOrder.deliverySn" class="input-width"></el-input>
                </el-form-item>
            </el-form>
            <div style="margin-top: 15px;text-align: center">
                <el-button @click="deliveryOrder.dialogVisible = false">取消</el-button>
                <el-button @click="deliveryOrderConfirm('orderSettingForm')" type="primary">确定</el-button>
            </div>
        </el-dialog>

        <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
    </div>
</template>
<script>
import { formatdate } from "@/util/date";
import LogisticsDialog from "@/view/order/components/logisticsDialog";
const defaultLogisticsCompanies = [
    "顺丰快递",
    "圆通快递",
    "中通快递",
    "韵达快递"
];
export default {
    name: "orderList",
    components: { LogisticsDialog },
    data() {
        return {
            listLoading: false,
            companyOptions: defaultLogisticsCompanies,
            logisticsDialogVisible: false,
            closeOrder: {
                dialogVisible: false,
                content: null,
                orderIds: []
            },
            listQuery: {
                orderSn: "",
                receiverKeyword: "",
                status: "",
                createTime: "2019-11-11 20:00:00",
                pageNum: 10,
                pageSize: 1
            },
            total: 30,
            statusOptions: [
                {
                    label: "待付款",
                    value: 0
                },
                {
                    label: "待发货",
                    value: 1
                },
                {
                    label: "已发货",
                    value: 2
                },
                {
                    label: "已完成",
                    value: 3
                },
                {
                    label: "已关闭",
                    value: 4
                }
            ],
            list: [
                {
                    autoConfirmDay: 15,
                    billContent: null,
                    billHeader: null,
                    billReceiverEmail: null,
                    billReceiverPhone: null,
                    billType: null,
                    commentTime: null,
                    confirmStatus: 0,
                    couponAmount: 10,
                    couponId: 2,
                    createTime: "2018-09-15T04:24:27.000+0000",
                    deleteStatus: 0,
                    deliveryCompany: "",
                    deliverySn: "",
                    deliveryTime: null,
                    discountAmount: 10,
                    freightAmount: 20,
                    growth: 13284,
                    id: 12,
                    integration: 13284,
                    integrationAmount: 0,
                    memberId: 1,
                    memberUsername: "test",
                    modifyTime: "2018-10-30T06:43:49.000+0000",
                    note: "xxx",
                    orderSn: "201809150101000001",
                    orderType: 0,
                    payAmount: 16377.75,
                    payType: 0,
                    paymentTime: null,
                    promotionAmount: 2344.25,
                    promotionInfo:
                        "单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠",
                    receiveTime: null,
                    receiverCity: "常州市",
                    receiverDetailAddress: "东晓街道",
                    receiverName: "大梨",
                    receiverPhone: "18033441849",
                    receiverPostCode: "518000",
                    receiverProvince: "江苏省",
                    receiverRegion: "天宁区",
                    sourceType: 1,
                    status: 1,
                    totalAmount: 18732,
                    useIntegration: null
                }
            ],
            deliveryOrder_rules: {
                deliverySn: [
                    {
                        required: true,
                        message: "请填写物流单号",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 40,
                        message: "长度在 2 到 40 个字符",
                        trigger: "blur"
                    }
                ]
            },
            deliveryOrder: {
                dialogVisible: false,
                ordersn: "",
                username: "",
                iphone: "",
                address: "",
                deliveryCompany: "",
                deliverySn: ""
            }
        };
    },
    created() {},
    methods: {
        //查询搜索
        handleSearchList() {},
        //重置
        handleResetSearch() {},

        //table选择
        handleSelectionChange() {},
        //查看订单
        handleViewOrder(index, row) {
            this.$router.push({
                path: "/oms/index/detail",
                query: { id: row.id }
            });
        },
        //关闭订单
        handleCloseOrder(index, row) {
            this.closeOrder.dialogVisible = true;
            this.closeOrder.orderIds = [row.id];
        },
        //确定关闭订单
        handleCloseOrderConfirm() {},
        //订单发货
        handleDeliveryOrder(index, row) {
            this.deliveryOrder.dialogVisible = true;
            this.deliveryOrder.ordersn = [row.orderSn];
        },
        //确定订单发货
        deliveryOrderConfirm(formName) {},
        //订单跟踪
        handleViewLogistics(index, row) {
            this.logisticsDialogVisible = true;
        },
        //删除订单
        handleDeleteOrder(index, row) {},
        //翻页选择
        handleSizeChange(val) {},
        //当前页码切换
        handleCurrentChange(val) {}
    },
    filters: {
        formatCreateTime(time) {
            let date = new Date(time);
            console.log(date);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
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
        },
        formatPayType(value) {
            if (value === 1) {
                return "支付宝";
            } else if (value === 2) {
                return "微信";
            } else {
                return "未支付";
            }
        }
    }
};
</script>