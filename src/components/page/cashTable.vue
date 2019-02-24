<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 收款表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="dataForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="画稿名称">
                                <el-input v-model="dataForm.drawName" placeholder="筛选关键词"
                                          class="handle-input mr10" style="width:250px"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="画稿金额">
                                <el-input-number v-model="dataForm.min" :min="0" :max="10000"></el-input-number>
                                -
                                <el-input-number v-model="dataForm.max" :min="0" :max="10000"></el-input-number>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="收款日期">
                                <el-date-picker
                                    v-model="dataForm.dataValue"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    format="yyyy-MM-dd"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="4">
                            <el-button type="primary" icon="search" @click="query()">搜索</el-button>
                            <el-button icon="search" @click="resetQuery()">置空</el-button>
                        </el-col>
                    </el-row>
                </el-form>

            </div>

            <el-table :data="tableData" border class="table" ref="multipleTable" highlight-current-row
                      :summary-method="getSummaries" v-loading="loading"
                      show-summary>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="cashDate" label="收款日期" align="center" sortable width="130">
                    <template slot-scope="scope">
                        <i class="el-icon-lx-time" style="font-size: 15px;color: #2b33ff">{{dataFormatter1(scope.row.cashDate) }}</i>
                    </template>
                </el-table-column>

                <el-table-column prop="drawName" label="画稿名称" align="center" width="150"></el-table-column>

                <el-table-column prop="orderDate" label="画稿接单日期" align="center" sortable width="130">
                    <template slot-scope="scope">
                        <i class="el-icon-lx-time" style="font-size: 15px;color: #ff9494">{{dataFormatter1(scope.row.orderDate) }}</i>
                    </template>
                </el-table-column>

                <el-table-column prop="cashType" label="收款方式" align="center" width="150">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.cashType == 'XJ'" type="info">{{ stateFormatter(scope.row.cashType) }}</el-tag>
                        <el-tag v-else-if="scope.row.cashType == 'WX'" type="warning">{{ stateFormatter(scope.row.cashType) }}
                        </el-tag>
                        <el-tag v-else-if="scope.row.cashType == 'YHK'" type="success">{{ stateFormatter(scope.row.cashType) }}
                        </el-tag>
                        <el-tag v-else="scope.row.cashType == 'ZFB'" type="primary">{{ stateFormatter(scope.row.cashType) }}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="getCash" label="收款金额" sortable align="center" width="140">
                    <template slot-scope="scope">
                        <i class="el-icon-lx-redpacket_fill" style="font-size: 15px;color: #ff5900">{{scope.row.getCash | rounding}}</i>
                    </template>

                </el-table-column>

                <el-table-column prop="cashUser" label="收款人" align="center" width="180"></el-table-column>
                <el-table-column prop="assistCash" label="协助费" align="center" width="100"></el-table-column>
                <el-table-column label="创建日期" width="250" align="center">
                    <template slot-scope="scope">
                        {{dataFormatter(scope.row.createDate) }}
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <pagination @search="query" :total="pageData.total" :currentPage="pageData.pageNum"/>
            </div>
        </div>

        <!--<div class="crumbs">-->
            <!--<el-breadcrumb separator="/">-->
                <!--<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 统计收款</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
        <!--</div>-->

        <div class="container">
            <!--<el-table :data="tableData2" border class="table" ref="multipleTable2" highlight-current-row>-->

                <!--<el-table-column prop="orderDate" label="收款月份" align="center" sortable width="450">-->
                    <!--<template slot-scope="scope">-->
                        <!--<div class="grid-cont-right">-->
                            <!--<div class="grid-num-1">{{scope.row.month }}</div>-->
                        <!--</div>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="orderDate" label="金额数量" align="center" sortable width="600">-->
                    <!--<template slot-scope="scope">-->

                        <!--<div class="grid-content grid-con-1">-->
                            <!--<i class="el-icon-lx-redpacket grid-con-icon"></i>-->
                            <!--<div class="grid-cont-right">-->
                                <!--<div class="grid-num">{{scope.row.cash }}</div>-->
                                <!--<div>已收金额</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</template>-->
                <!--</el-table-column>-->

            <!--</el-table>-->

        </div>


    </div>
</template>

<script>
    import cashApi from '../../api/business/drawCash';
    import pagination from '../../components/common/pagination.vue';
    import moment from 'moment';
    import Vue from 'vue'

    export default {
        name: 'cashtable',
        data() {
            return {
                params: {},
                temp1:null,
                temp2:null,
                dataForm: {
                    drawName: null,
                    min: 0,
                    max: 0,
                    dataValue: [],
                },
                token: {
                    token: sessionStorage.getItem('token'),
                },
                loading: false,
                drawId: null,
                pageData: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tableData: [],   //画稿列表
                tableData2: [],   //画稿列表
                cashDatas: [],   //收款明细
                cashForm: {},    //增加画稿收款记录
                cashTypeList: [{
                    value: "XJ",
                    label: "现金"
                }, {
                    value: "WX",
                    label: "微信"
                }, {
                    value: "ZFB",
                    label: "支付宝"
                }, {
                    value: "YHK",
                    label: "银行卡"
                }],

                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,

            }
        },
        components: {
            "pagination": pagination
        },
        created() {
            this.query();
            // this.queryCashByMonth();
        },
        watch: {
        },
        computed: {
        },
        filters: {
            rounding(value) {
                return value.toFixed(2)
            }
        },
        methods: {

            //页面初始化查询
            query(pageNum, pageSize) {

                var param = this.dataForm;
                param.current = pageNum || 1;
                param.size = pageSize || this.pageData.pageSize;
                //判断是否选择日期
                if (Array.isArray(this.dataForm.dataValue) && this.dataForm.dataValue.length != 0) {
                    param.beginTime = this.dataForm.dataValue[0];
                    param.endTime = this.dataForm.dataValue[1];
                }
                this.loading = true;
                cashApi.selectListByPage(param).then(data => {
                    this.loading = false;
                    if (data && data.code == 0) {
                        this.tableData = data.page.records;
                        this.pageData.total = data.page.total;
                    } else {
                        this.tableData = []
                        this.pageData.total = 0
                    }
                    this.pageData.pageNum = param.current;
                    this.pageData.pageSize = param.size;
                });
            },
            //按月统计收款
            queryCashByMonth(){
                cashApi.selectMonthDrawCash().then(data => {
                    if (data && data.code == 0) {
                        this.tableData2 = data.data;
                    }
                });
            },
            resetQuery() {
                this.dataForm.dataValue = [];
                this.dataForm = {};
                this.dataForm.min = 0;
                this.dataForm.max = 0;
                this.query();
            },
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if (index == 5) {
                        const values = data.map(item =>
                            Number(item[column.property]));
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                            this.temp1 =  sums[index];
                            sums[index] +=' 元(总额)';
                        } else {
                            sums[index] = '';
                        }
                    }else if(index == 7){
                        const values = data.map(item =>
                            Number(item[column.property]));
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                            this.temp2 =  sums[index];
                            sums[index] +=' 元(协助)';
                        } else {
                            sums[index] = '';
                        }
                    }else if(index == 6){
                        //自己所得费用
                        sums[index] = (this.temp1-this.temp2)+" 元(林一)";
                    }
                });
                return sums;
            },

            dataFormatter(value) {
                return moment(value).format("YYYY-MM-DD HH:MM:SS");
            },

            dataFormatter1(value) {
                return moment(value).format("YYYY-MM-DD");
            },
            stateFormatter(value) {
                switch (value){
                    case "XJ":
                        return "现金";
                        break;
                    case "WX":
                        return "微信";
                        break;
                    case "ZFB":
                        return "支付宝";
                        break;
                    case "YHK":
                        return "银行卡";
                        break;
                    default:
                        return "";
                        break;
                }
            },

            cashTypeFormatter(row, column) {
                switch (row.cashType) {
                    case "XJ":
                        return "现金";
                        break;
                    case "WX":
                        return "微信";
                        break;
                    case "ZFB":
                        return "支付宝";
                        break;
                    case "YHK":
                        return "银行卡";
                        break;
                }
            },
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #4c7b99;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 75px;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(100, 213, 114);
    }
    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }
   .grid-num-1 {
        font-size: 30px;
        font-weight: bold;
        color: rgb(240, 78, 55);
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .el-table .info-row {
        background: #d8c8fd;
    }

    .el-table .warning-row {
        background: #fdc650;
    }

    .el-table .success-row {
        background: #4b7ff9;
    }

</style>
