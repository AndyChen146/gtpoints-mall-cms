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
                    <el-form-item label="评价类型：">
                        <el-select
                            v-model="listQuery.explain_type"
                            placeholder="全部"
                            clearable
                            class="input-width"
                        >
                            <el-option
                                v-for="item in statusOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始时间：">
                        <el-date-picker
                            type="datetime"
                            placeholder="选择开始日期"
                            v-model="listQuery.stime"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间：">
                        <el-date-picker
                            type="datetime"
                            placeholder="选择结束日期"
                            v-model="listQuery.etime"
                        ></el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span style="margin-left:10px">数据列表</span>
        </el-card>
        <div class="table-container">
            <el-table
                ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
            >
                <el-table-column label="编号" width="60" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="商品名称" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.goods_name}}</template>
                </el-table-column>
                <el-table-column label="⽤户昵称" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.user_nick}}</template>
                </el-table-column>
                <el-table-column label="是否匿名" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.is_anonymous | isAnonymous}}</template>
                </el-table-column>
                <el-table-column label="评分" width="60" align="center">
                    <template slot-scope="scope">{{scope.row.scores}}</template>
                </el-table-column>
                <el-table-column label="评价类型" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.explain_type | isExplainType}}</template>
                </el-table-column>
                <el-table-column label="评价时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.create_time | formatTimes}}</template>
                </el-table-column>
                <el-table-column label="是否显示" width="160" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handlePublishStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.is_show"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleDetail(scope.$index, scope.row)"
                        >回复</el-button>
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
                :page-sizes="[5,10,15]"
                :current-page.sync="listQuery.page"
                :total="total"
            ></el-pagination>
        </div>
        <el-dialog title="评价详情" :visible.sync="dialogVisible" width="50%">
            <el-form ref="storeCateForm" :model="storeCate" label-width="120px">
                <el-form-item label="用户名称：">
                    <el-input v-model="storeCate.user_nick" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品名称：">
                    <el-input v-model="storeCate.goods_name" disabled></el-input>
                </el-form-item>
                <el-form-item label="订单号：">
                    <el-input v-model="storeCate.order_no" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品单价：">
                    <el-input v-model="storeCate.goods_price" disabled></el-input>
                </el-form-item>
                <el-form-item label="评价内容：">
                    <el-input type="textarea" v-model="storeCate.content" disabled></el-input>
                </el-form-item>
                <el-form-item label="评价图片：">
                    <!-- <el-input type="textarea" v-model="storeCate.images" disabled></el-input> -->
                    <p>
                        <img
                            style="width: 100px;80px;margin-right: 10px;cursor: pointer;"
                            v-for="(item,index) in storeCate.images"
                            :key="index"
                            :src="item"
                            alt
                        />
                    </p>
                </el-form-item>
                <el-form-item label="客服回复内容：">
                    <el-input type="textarea" v-model="storeCate.reply"></el-input>
                </el-form-item>
                <el-form-item label="回复时间：">
                    <el-input v-model="storeCate.reply_time" disabled></el-input>
                </el-form-item>
                <el-form-item label="是否匿名：">
                    <el-radio-group v-model="storeCate.is_anonymous" disabled>
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="评价类型：">
                    <el-radio-group v-model="storeCate.explain_type" disabled>
                        <el-radio :label="1">好评</el-radio>
                        <el-radio :label="2">中评</el-radio>
                        <el-radio :label="3">差评</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否显示：">
                    <el-radio-group v-model="storeCate.is_show" disabled>
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="评价时间：">
                    <el-input v-model="storeCate.create_time" disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    goodsAssessList,
    goodsAssessShow,
    goodsAssessReply
} from "@/api/goods";
import { formatTime } from "@/util/datas";
export default {
    name: "assessList",
    data() {
        return {
            dialogVisible: false,
            replyVisible: false,
            list: [],
            storeCate: {},
            storeReply: {},
            total: 0,
            listLoading: false,
            listQuery: {
                page: 1,
                size: 10,
                explain_type: 1,
                stime: "",
                etime: ""
            },
            statusOptions: [
                {
                    id: 1,
                    name: "好评"
                },
                {
                    id: 2,
                    name: "中评"
                },
                {
                    id: 3,
                    name: "差评"
                }
            ]
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //获取评价列表
        getList() {
            this.listLoading = true;
            goodsAssessList(this.listQuery).then(res => {
                this.listLoading = false;
                this.list = res.data.list;
                this.total = res.data.total;
            });
        },
        //搜索查询
        handleSearchList() {
            // this.listQuery.stime = formatTime(this.listQuery.stime);
            // this.listQuery.etime = formatTime(this.listQuery.etime);
            this.getList();
        },
        //搜索重置
        handleResetSearch() {
            this.listQuery.page = 1;
            this.listQuery.size = 10;
            this.listQuery.explain_type = 1;
            this.listQuery.stime = "";
            this.listQuery.etime = "";
            this.getList();
        },
        //翻页页码选择
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.listQuery.page = 1;
            this.getList();
        },
        //翻页选择
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        handleSelectionChange(val) {},
        //详情查看
        handleDetail(index, row) {
            this.dialogVisible = true;
            this.storeCate = {
                id: row.id,
                user_nick: row.user_nick,
                order_no: row.order_no,
                goods_name: row.goods_name,
                goods_price: row.goods_price,
                goods_picture: row.goods_picture,
                content: row.content,
                images: row.images.split(","),
                reply: row.reply,
                reply_time: formatTime(row.reply_time),
                user_nick: row.user_nick,
                user_avatar: row.user_avatar,
                is_anonymous: row.is_anonymous,
                scores: row.scores,
                explain_type: row.explain_type,
                is_show: row.is_show,
                create_time: formatTime(row.create_time)
            };
        },
        //回复提交
        handleConfirm() {
            if (this.storeCate.reply == "") {
                this.$message.closeAll();
                return this.$message.error("回复内容不能为空！");
            }
            goodsAssessReply({
                id: this.storeCate.id,
                reply: this.storeCate.reply
            }).then(res => {
                this.$message.success("操作成功！");
                this.dialogVisible = false;
                this.getList();
            });
        },

        //显示隐藏
        handlePublishStatusChange(index, row) {
            goodsAssessShow({
                id: row.id,
                is_show: row.is_show
            }).then(res => {
                this.$message.success("操作成功！");
                this.getList();
            });
        }
    },
    filters: {
        isAnonymous(n, o) {
            return (n = 0 ? "匿名" : "实名");
        },
        isExplainType(n, o) {
            if (n == 1) {
                return "好评";
            } else if (n == 2) {
                return "中评";
            } else {
                return "差评";
            }
        },
        formatTimes(time) {
            if (time == null || time === "") {
                return "N/A";
            }
            let date = new Date(time);
            return formatTime(time);
        }
    }
};
</script>
