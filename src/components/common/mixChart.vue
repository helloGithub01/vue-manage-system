<template>
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'
    import resize from './mixins/resize'
    import echartsApi from '@/api/business/echarts';


    export default {
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '200px'
            }
        },
        data() {
            return {
                chart: null,
                data1: [],
                data2: [],
                data3: []
            }
        },
        mounted() {
            this.initChart()
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id))
                const xData = (function () {
                    const data = []
                    for (let i = 1; i < 13; i++) {
                        data.push(i + 'month')
                    }
                    return data
                }())


                echartsApi.selectDrawAmountList().then(data => {
                    if (data && data.code == 0) {
                        this.data1 = data.data1;
                        this.data2 = data.data2;
                        this.data3 = data.data3;

                        this.chart.setOption({
                            backgroundColor: '#344b58',
                            title: {
                                text: '统计',
                                x: '20',
                                top: '20',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '22'
                                },
                                subtextStyle: {
                                    color: '#90979c',
                                    fontSize: '16'
                                }
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            grid: {
                                borderWidth: 0,
                                top: 110,
                                bottom: 95,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            legend: {
                                x: '5%',
                                top: '10%',
                                textStyle: {
                                    color: '#90979c'
                                },
                                data: ['已收', '未收', '总价']
                            },
                            calculable: true,
                            xAxis: [{
                                type: 'category',
                                axisLine: {
                                    lineStyle: {
                                        color: '#90979c'
                                    }
                                },
                                splitLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                splitArea: {
                                    show: false
                                },
                                axisLabel: {
                                    interval: 0

                                },
                                data: xData
                            }],
                            yAxis: [{
                                type: 'value',
                                splitLine: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#90979c'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    interval: 0
                                },
                                splitArea: {
                                    show: false
                                }
                            }],
                            dataZoom: [{
                                show: true,
                                height: 30,
                                xAxisIndex: [
                                    0
                                ],
                                bottom: 30,
                                start: 0,
                                end: 100,
                                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                                handleSize: '110%',
                                handleStyle: {
                                    color: '#d3dee5'

                                },
                                textStyle: {
                                    color: '#fff'
                                },
                                borderColor: '#90979c'

                            }, {
                                type: 'inside',
                                show: true,
                                height: 15,
                                start: 1,
                                end: 35
                            }],
                            series: [{
                                name: '已收',
                                type: 'bar',
                                stack: 'total',
                                barMaxWidth: 35,
                                barGap: '10%',
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(255,144,128,1)',
                                        label: {
                                            show: true,
                                            textStyle: {
                                                color: '#fff'
                                            },
                                            position: 'insideTop',
                                            formatter(p) {
                                                return p.value > 0 ? p.value : ''
                                            }
                                        }
                                    }
                                },
                                data: this.data1},
                                {
                                    name: '未收',
                                    type: 'bar',
                                    stack: 'total',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(0,191,183,1)',
                                            barBorderRadius: 0,
                                            label: {
                                                show: true,
                                                position: 'top',
                                                formatter(p) {
                                                    return p.value > 0 ? p.value : ''
                                                }
                                            }
                                        }
                                    },
                                    data: this.data2}, {
                                    name: '总额',
                                    type: 'line',
                                    stack: 'total',
                                    symbolSize: 10,
                                    symbol: 'circle',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(252,230,48,1)',
                                            barBorderRadius: 0,
                                            label: {
                                                show: true,
                                                position: 'top',
                                                formatter(p) {
                                                    return p.value > 0 ? p.value : ''
                                                }
                                            }
                                        }
                                    },
                                    data: this.data3}
                            ]
                        })
                    }
                })
            }
        }
    }
</script>
