<template>
    <el-card class="form-container" style="width:900px" shadow="never">
        <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="100px">
            <el-form-item label="类型名称：" prop="name">
                <el-input v-model="brand.name"></el-input>
            </el-form-item>
            <el-form-item label="属性排序：" prop="sort">
                <el-input v-model.number="brand.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否启用：">
                <el-radio-group v-model="brand.status">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="关联规格：" prop="spec_ids">
                <el-select v-model="brand.spec_ids" style="width:100%" multiple placeholder="请选择">
                    <el-option
                        v-for="item in formats"
                        :key="item.spec_id"
                        :label="item.name"
                        :value="item.spec_id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关联品牌：" prop="brand_ids">
                <el-select v-model="brand.brand_ids" style="width:100%" multiple placeholder="请选择">
                    <el-option
                        v-for="item in brands"
                        :key="item.brand_id"
                        :label="item.name"
                        :value="item.brand_id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="属性添加：">
                <el-button class="btn-add" @click="addItems()" size="mini">添加属性</el-button>
            </el-form-item>
            <el-form-item label>
                <el-table ref="brandTable" :data="tablelist" style="width: 100%" border>
                    <el-table-column label="排序" width="60" align="center">
                        <template slot-scope="scope">
                            <el-input v-model.number="scope.row.sort" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性名称" width="100" align="center">
                        <template slot-scope="scope">
                            <el-input v-model.number="scope.row.name" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性类型" width="120" align="center">
                        <template slot-scope="scope">
                            <el-select
                                v-model="scope.row.type"
                                style="width:100%"
                                size="mini"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in tablesTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.values" size="mini" placeholder="多个以,分隔"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button
                                class="btn-add"
                                size="mini"
                                @click="delItems(scope.$index)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
                <el-button @click="resetForm()">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import { getProtypeInfo, updateProtype } from "@/api/protype";
import { getBrandsList } from "@/api/brand";
import { getFormatList } from "@/api/format";
export default {
    name: "formatDetail",
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tablelist: [],
            tables: {
                sort: "",
                name: "",
                type: 1,
                values: ""
            },
            tablesTypes: [
                {
                    name: "输入框",
                    id: 1
                },
                {
                    name: "单选框",
                    id: 2
                },
                {
                    name: "复选框",
                    id: 3
                }
            ],
            brand: {
                items: "",
                spec_ids: "",
                brand_ids: "",
                name: "",
                status: 1,
                sort: ""
            },
            brands: [],
            formats: [],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入规格名称",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 140,
                        message: "长度在 2 到 140 个字符",
                        trigger: "blur"
                    }
                ],
                spec_ids: [
                    {
                        required: true,
                        message: "请至少选择一个规格",
                        trigger: "blur"
                    }
                ],
                brand_ids: [
                    {
                        required: true,
                        message: "请至少选择一个品牌",
                        trigger: "blur"
                    }
                ],
                sort: [{ type: "number", message: "排序必须为数字" }]
            }
        };
    },
    created() {
        let id = this.$route.query.id;
        if (id) {
            this.getInfo(id);
        }
        this.getBrands();
        this.getFormats();
    },
    methods: {
        //获取品牌
        getBrands() {
            getBrandsList({ page: 1, size: 1000 }).then(res => {
                this.brands = res.data.list;
            });
        },
        //获取规格
        getFormats() {
            getFormatList({ page: 1, size: 1000 }).then(res => {
                this.formats = res.data.list;
            });
        },
        //添加属性
        addItems() {
            let tables = {
                sort: "",
                name: "",
                type: 1,
                values: ""
            };
            this.tablelist.push(tables);
        },
        //删除属性
        delItems(index) {
            this.tablelist.splice(index, 1);
        },
        //获取品牌详情
        getInfo(id) {
            getProtypeInfo({ spec_id: id }).then(res => {
                // this.brand.name = res.data.name;
                // this.brand.show_type = res.data.show_type;
                // this.brand.sort = res.data.sort;
                // this.brand.spec_des = res.data.spec_des;
                // this.brand.spec_id = res.data.spec_id;
                // this.brand.status = res.data.status;
                // this.brand.items = res.data.spec_value_name;
            });
        },
        //取消
        resetForm() {
            this.$router.push("/pms/protype");
        },
        //提交
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.updateData();
                } else {
                }
            });
        },
        //提交数据到服务端
        updateData() {
            updateProtype(this.brand).then(res => {
                this.$message.success(res.msg);
                this.$router.push("/pms/protype");
            });
        }
    }
};
</script>