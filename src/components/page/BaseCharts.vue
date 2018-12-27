<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-favor"></i> schart图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-redpacket grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{totalAmount}}</div>
                                    <div>画稿总金额</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-goodsfill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{receiveAmount}}</div>
                                    <div>已收金额</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-recharge grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{noReceiveAmount}}</div>
                                    <div>未收金额</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <!--<div class="schart-box">-->
            <!--<div class="content-title">柱状图</div>-->
            <!--<schart class="schart" canvasId="bar" :data="data1" type="bar" :options="options1"></schart>-->
            <!--</div>-->
            <!--<div class="schart-box">-->
            <!--<div class="content-title">折线图</div>-->
            <!--<schart class="schart" canvasId="line" :data="data1" type="line" :options="options2"></schart>-->
            <!--</div>-->
            <el-row :gutter="20" class="mgb20">
                <el-col :span="12">
                    <div class="schart-box">
                        <div class="content-title">类型占比饼状图</div>
                        <schart class="schart" canvasId="pie" :data="data2" type="pie" :options="options3"></schart>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="schart-box">
                        <div class="content-title">客户来源环形图</div>
                        <schart class="schart" canvasId="ring" :data="data3" type="ring" :options="options4"></schart>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mgb20">
                <el-col :span="12">
                    <div class="schart-box">
                        <div class="content-title">金额占比环形图</div>
                        <schart class="schart" canvasId="bar" :data="data1" type="ring" :options="options1"></schart>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import echartsApi from '@/api/business/echarts';

    export default {
        name: 'basecharts',
        components: {
            Schart
        },
        data: () => ({
            totalAmount: null,
            receiveAmount: null,
            noReceiveAmount: null,
            data1: [],   //资金占比
            data2: [],  //类型金额数
            data3: [],  //来源金额数
            options1: {
                title: '某商店近年营业总额',
                autoWidth: true,   // 设置宽高自适应
                showValue: false,
                bgColor: '#F9EFCC',
                fillColor: '#00887C',
                contentColor: 'rgba(46,199,201,0.3)',
                yEqual: 7
            },
            options2: {
                title: '不同金额类型占比',
                bgColor: '#D5E4EB',
                titleColor: '#00887C',
                fillColor: 'red',
                contentColor: 'rgba(46,199,201,0.3)'
            },
            options3: {
                title: '不同画稿类型金额比',
                bgColor: '#4b6b93',
                titleColor: '#daf3fd',
                legendColor: '#a4a4a4',
                radius: 120
            },
            options4: {
                title: '不同客户商画稿金额比',
                bgColor: '#829daa',
                titleColor: '#ffffff',
                legendColor: '#ffffff',
                radius: 120,
                innerRadius: 80
            }
        }),
        methods:{
            selectOrderAmountsFunc() {
                echartsApi.selectOrderAmounts().then(data => {
                    if (data && data.code == 0) {
                        this.totalAmount = data.totalAmount;
                        this.noReceiveAmount = data.noReceiveAmount;
                        this.receiveAmount = data.receiveAmount;
                    }
                })
            },
            selectDrawTypeAmountFunc(){
                echartsApi.selectDrawTypeAmount().then(data => {
                    if (data && data.code == 0) {
                        this.data2 = data.list;
                    }
                })
            },
            selectDrawSourceAmountFunc(){
                echartsApi.selectDrawSourceAmount().then(data => {
                    if (data && data.code == 0) {
                        this.data3 = data.list;
                    }
                })
            },
            selectDrawRateAmountFunc(){
                echartsApi.selectDrawRateAmount().then(data => {
                    if (data && data.code == 0) {
                        this.data1 = data.list;
                    }
                })
            },
        },
        created:function () {

            this.selectOrderAmountsFunc();
            //不同类型金额比；
            this.selectDrawTypeAmountFunc();
            //不同客户金额比；
            this.selectDrawSourceAmountFunc();
            //不同资金占比
            this.selectDrawRateAmountFunc();
        }

    }
</script>

<style scoped>
    .schart-box {
        display: inline-block;
        margin: 20px;
    }

    .schart {
        width: 500px;
        height: 400px;
    }

    .content-title {
        clear: both;
        font-weight: 500;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
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

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }
</style>
