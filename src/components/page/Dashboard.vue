<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="static/img/img.jpg" class="user-avator" alt="">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
                    <div class="user-info-list">上次登录地点：<span>成都</span></div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>
                    Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
                    JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    CSS
                    <el-progress :percentage="3.7"></el-progress>
                    HTML
                    <el-progress :percentage="0.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">20</div>
                                    <div>用户人数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-mail grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">18</div>
                                    <div>已发邮件</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-picfill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">2018</div>
                                    <div>画稿图片总数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待收金额画稿</span>
                        <!--<el-button style="float: right; padding: 3px 0" type="text">倒序</el-button>-->
                    </div>
                    <el-table :data="itemList" :show-header="true" height="304" style="width: 100%;font-size:14px;">

                        <el-table-column type="index" label="序号" align="center"></el-table-column>
                        <el-table-column prop="dateStr" label="接单日期" align="center" ></el-table-column>
                        <el-table-column prop="drawName" label="画稿名称" align="center" ></el-table-column>
                        <el-table-column prop="source" label="画稿来源" align="center" ></el-table-column>
                        <el-table-column label="状态" align="center">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.state == 0" type="info">{{ stateFormatter(scope.row.state) }}</el-tag>
                                <el-tag v-else-if="scope.row.state == 1" type="warning">{{ stateFormatter(scope.row.state) }}
                                </el-tag>
                                <el-tag v-else="scope.row.state == 2" type="success">{{ stateFormatter(scope.row.state) }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="leaveAmount" label="待收金额" align="center"></el-table-column>


                        <!--<el-table-column width="40">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-checkbox v-model="scope.row.status"></el-checkbox>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column>-->
                            <!--<template slot-scope="scope">-->
                                <!--<div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column width="60">-->
                            <!--<template slot-scope="scope">-->
                                <!--<i class="el-icon-edit"></i>-->
                                <!--<i class="el-icon-delete"></i>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :data="orderData" type="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :data="cashData" type="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    import statisApi from '@/api/dashBoard';

    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                itemList:[],
                todoList: [{
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: false,
                    }, {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    }
                ],
                totalAmount:null,
                noReceiveAmount:null,
                receiveAmount:null,
                orderData:[],
                cashData:[],
                options: {
                    title: '最近商稿接单记录',
                    showValue: false,
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options2: {
                    title: '最近商稿收款记录',
                    fillColor: '#FC6FA1',
                    axisColor: '#008ACD',
                    contentColor: '#EEEEEE',
                    bgColor: '#F5F8FD',
                    bottomPadding: 30,
                    topPadding: 30
                }
            }
        },
        components: {
            Schart
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){
            this.queryNoReceiveRecord();
            this.queryOrderRecord();
            // this.queryOrderSize();
            this.handleListener();
            // this.changeDate();
        },
        activated(){
            this.handleListener();
        },
        deactivated(){
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
            stateFormatter(value) {
                if (value == 0) {
                    return "未收款";
                } else if (value == 1) {
                    return "部分收款";
                } else {
                    return "收完款";
                }
            },
            queryNoReceiveRecord(){
                statisApi.queryNoReceiveRecord().then(data =>{
                    if (data && data.code == 0) {
                        this.itemList = data.list;
                    }
                })
            },
            queryOrderRecord(){
                statisApi.selectOrderRecord().then(data =>{
                    if (data && data.code == 0) {
                        this.orderData = data.list1;
                        this.cashData = data.list2;
                    }
                })
            },
            queryOrderSize(){
                statisApi.selectOrderAmounts().then(data =>{
                    if (data && data.code == 0) {
                        this.totalAmount = data.totalAmount;
                        this.noReceiveAmount = data.noReceiveAmount;
                        this.receiveAmount = data.receiveAmount;
                    }
                })
            },
            // changeDate(){
            //     const now = new Date().getTime();
            //     this.data.forEach((item, index) => {
            //         const date = new Date(now - (6 - index) * 86400000);
            //         item.name = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
            //     })
            // },
            handleListener(){
                bus.$on('collapse', this.handleBus);
                // 调用renderChart方法对图表进行重新渲染
                window.addEventListener('resize', this.renderChart)
            },
            handleBus(msg){
                setTimeout(() => {
                    this.renderChart()
                }, 300);
            },
            renderChart(){
                this.$refs.bar.renderChart();
                this.$refs.line.renderChart();
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

</style>
