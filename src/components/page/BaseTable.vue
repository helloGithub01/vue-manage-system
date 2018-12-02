<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="dataForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="画稿名称">
                                <el-input v-model="dataForm.drawName" placeholder="筛选关键词"
                                          class="handle-input mr10" style="width:280px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="画稿客户">
                                <el-select v-model="dataForm.drawType" placeholder="画稿类型" class="handle-select mr10">
                                    <el-option key="1" label="风景" value=""></el-option>
                                    <el-option key="2" label="人文" value=""></el-option>
                                    <el-option key="3" label="美食" value=""></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="画稿类型">
                                <el-select v-model="dataForm.drawType" placeholder="画稿类型" class="handle-select mr10">
                                    <el-option key="1" label="风景" value=""></el-option>
                                    <el-option key="2" label="人文" value=""></el-option>
                                    <el-option key="3" label="美食" value=""></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="画稿金额">
                                <el-input-number v-model="dataForm.min" :min="0" :max="2000"></el-input-number>
                                -
                                <el-input-number v-model="dataForm.max" :min="0" :max="2000"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="付款状态">
                                <el-select v-model="dataForm.state" placeholder="付款状态" class="handle-select mr10">
                                    <el-option key="1" label="待付" value=""></el-option>
                                    <el-option key="2" label="部分付" value=""></el-option>
                                    <el-option key="3" label="完结" value=""></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="创建时间">
                                <el-date-picker
                                    v-model="dataForm.dataValue"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="是否定金">
                                <el-select v-model="dataForm.isPay" placeholder="是否定金" class="handle-select mr10">
                                    <el-option key="1" label="是" value=""></el-option>
                                    <el-option key="2" label="否" value=""></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" icon="search" @click="query()">搜索</el-button>
                            <el-button icon="search" @click="resetQuery()">置空</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <el-button type="warning" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>

                <el-button type="success" icon="add" class="handle-del mr10" @click="add">新增</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" highlight-current-row
                      @selection-change="handleSelectionChange"
                      :summary-method="getSummaries"
                      show-summary>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="orderDate" label="接单日期" align="center" sortable width="120"
                                 :formatter="dataFormatter">
                    <template slot-scope="scope">
                        <i class="el-icon-lx-time" style="font-size: 15px;color: #2b33ff">{{dataFormatter1(scope.row.orderDate) }}</i>
                    </template>
                </el-table-column>
                <el-table-column prop="drawName" label="画稿名称" align="center" width="150"></el-table-column>
                <el-table-column prop="source" label="画稿客户" align="center" width="200"></el-table-column>
                <el-table-column prop="drawType" label="画稿类型" align="center" width="100"></el-table-column>
                <el-table-column prop="isPay" label="是否定金" align="center" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.isPay === 1?'success':'warning'">{{ payFormatter(scope.row.isPay) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="picUrl" label="画稿图片" align="center" width="120">
                    <template slot-scope="scope">
                        <img :src="scope.row.picUrl" width="75" height="35" class="img_show"
                             @click="showBigImg(scope.row.picUrl)">
                    </template>
                </el-table-column>
                <el-table-column prop="drawAmount" label="画稿金额$(元)" sortable align="center" width="140">
                    <template slot-scope="scope">
                        <i class="el-icon-lx-redpacket_fill" style="font-size: 15px;color: #ff5900">{{scope.row.drawAmount | rounding}}</i>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="付款状态" align="center" width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.state == 0" type="info">{{ stateFormatter(scope.row.state) }}</el-tag>
                        <el-tag v-else-if="scope.row.state == 1" type="warning">{{ stateFormatter(scope.row.state) }}
                        </el-tag>
                        <el-tag v-else="scope.row.state == 2" type="success">{{ stateFormatter(scope.row.state) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createDate" label="创建时间" align="center" width="200"></el-table-column>
                <el-table-column prop="createUser" label="创建人" align="center" width="120"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-goods" @click="handleCash(scope.$index, scope.row)">收款
                        </el-button>
                        <el-button type="text" icon="el-icon-upload" @click="handleUpload(scope.$index, scope.row)">上传
                        </el-button>
                        <!--<el-button type="text" icon="el-icon-search" @click="searchCash(scope.$index, scope.row)">查看</el-button>-->
                        <el-button type="text" icon="el-icon-lx-tag" @click="confirm(scope.$index, scope.row)">确认
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <pagination @search="query" :total="pageData.total" :currentPage="pageData.pageNum"/>
            </div>
        </div>

        <div class="container">
            <el-tabs v-model="activeName">
                <el-tab-pane label="收款明细" name="first">
                    <el-table :data="cashDatas" tooltip-effect="dark" border style="width: 80%">
                        <el-table-column type="index" label="序号" align="center"></el-table-column>
                        <el-table-column prop="vehicleNo" label="收款日期" align="center"></el-table-column>
                        <el-table-column prop="driverName" label="收款方式" align="center"></el-table-column>
                        <el-table-column prop="materialCode" label="收款人" align="center"></el-table-column>
                        <el-table-column prop="materialName" label="收款金额" align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="画稿详情" name="second">
                    <el-form :inline="true" :model="draw" class="demo-form-inline" label-width="200px">
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <el-form-item label="定金金额" class="form-label">
                                    <el-input v-model="draw.deposit" style="width: 100%;" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否多人" class="form-label">
                                    <el-input v-model="draw.deposit" style="width: 100%;" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <el-form-item label="扣税金额" class="form-label">
                                    <el-input v-model="draw.taxAmount" style="width: 100%;" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="协助费用" class="form-label">
                                    <el-input v-model="draw.assistCash" style="width: 100%;"
                                              :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 收款弹出框 -->
        <el-dialog title="收款记录" :visible.sync="cashVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="收款日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd"
                                    style="width: 80%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="收款方式">
                    <el-select v-model="value" placeholder="请选择" style="width: 80%;">
                        <el-option
                            v-for="item in cashType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收款金额" style="width: 80%;">
                    <el-input-number v-model="form.price" :min="0" :max="10000"></el-input-number>
                </el-form-item>
                <el-form-item label="收款人" style="width: 80%;">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cashVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!--上传弹框-->
        <el-dialog title="上传画稿" :visible.sync="uploadVisible" width="30%">
            <el-upload align="center"
                       class="avatar-uploader"
                       :action="123"
                       :show-file-list="false"
                       :on-success="uploadImg"
                       :before-upload="123">
                <img v-if="false" :src="123" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-dialog>

        <!-- 确认提示框 -->
        <el-dialog title="确认" :visible.sync="confirmVisible" width="300px" center>
            <div class="del-dialog-cnt">此幅画稿是否收完款项，确定？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="预览大图"
            :close-on-click-modal="true"
            :visible.sync="showVisible">
            <div>
                <img :src="picUrl" width="100%"/>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import drawApi from '../../api/business/draw';
    import pagination from '../../components/common/pagination.vue';
    import moment from 'moment';

    export default {
        name: 'basetable',
        data() {
            return {
                dataForm: {
                    drawName: null,
                    drawType: null,
                    isPay: null,
                    min: 0,
                    max: 0,
                    state: null,
                    dataValue: [],
                    isMulti: null
                },
                activeName: 'first',
                url: './static/vuetable.json',
                picUrl: null,
                showVisible: false,
                pageData: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tableData: [],
                cashDatas: [],
                cashType: [{
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
                draw: {},
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                cashVisible: false,
                uploadVisible: false,
                confirmVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        components: {
            "pagination": pagination
        },
        created() {
            this.query();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        filters:{
            rounding (value) {
                return value.toFixed(2)
            }
        },
        methods: {
            query(pageNum, pageSize) {

                var param = this.dataForm;
                param.current = pageNum || 1;
                param.size = pageSize || this.pageData.pageSize;
                param.beginTime = this.dataForm.dataValue[0];
                param.endTime = this.dataForm.dataValue[1];
                drawApi.selectListByPage(param).then(data => {

                    if (data && data.code == 0) {
                        this.tableData = data.page.list;
                        this.pageData.total = data.page.totalCount;
                    } else {
                        this.tableData = []
                        this.pageData.total = 0
                    }
                    this.pageData.pageNum = param.current;
                    this.pageData.pageSize = param.size;
                });
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                // this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                }
                ;
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    if (index == 7) {
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
                            sums[index] += ' 元';
                        } else {
                            sums[index] = '';
                        }
                    }
                });

                return sums;
            },
            resetQuery() {
                this.dataForm = {};
                this.query();
            },
            showBigImg(url) {
                this.showVisible = true
                this.picUrl = url
            },

            dataFormatter(row, column) {
                return moment(row.orderDate).format("YYYY-MM-DD");
            },
            dataFormatter1(value) {
                return moment(value).format("YYYY-MM-DD");
            },
            payFormatter(value) {
                if (value == 1) {
                    return "已付";
                } else {
                    return "未付";
                }
            },
            stateFormatter(value) {
                if (value == 0) {
                    return "未收款";
                } else if (value == 1) {
                    return "部分收款";
                } else {
                    return "收完款";
                }
            },

            filterTag(value, row) {
                return row.tag === value;
            },
            //查看收款明细
            searchCash(index, row) {

            },
            handleCash(index, row) {
                this.cashVisible = true;
            },
            handleUpload(index, row) {
                this.uploadVisible = true;
            },
            //确认画稿完结
            confirm(index, row) {
                this.confirmVisible = true;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            uploadImg() {

            },
            //添加画稿
            add() {
                this.$router.push('/form');
            },
            //删除多条记录
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            // 确定删除
            deleteRow() {
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .img_show {
        margin: 0 auto;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
</style>
