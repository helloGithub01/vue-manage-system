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
                                          class="handle-input mr10" style="width:250px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="画稿客户">
                                <el-select v-model="dataForm.source" placeholder="画稿客户" class="handle-select mr10">
                                    <el-option key="1" label="十月微城" value="十月微城"></el-option>
                                    <el-option key="2" label="尘星文化" value="尘星文化"></el-option>
                                    <el-option key="3" label="中国国家地理" value="中国国家地理"></el-option>
                                    <el-option key="4" label="散客" value="散客"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="画稿类型">
                                <el-select v-model="dataForm.drawType" placeholder="画稿类型" class="handle-select mr10">
                                    <el-option key="1" label="风景" value="风景"></el-option>
                                    <el-option key="2" label="人文" value="人文"></el-option>
                                    <el-option key="3" label="地图" value="地图"></el-option>
                                    <el-option key="4" label="美食" value="美食"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="画稿金额">
                                <el-input-number v-model="dataForm.min" :min="0" :max="10000"></el-input-number>
                                -
                                <el-input-number v-model="dataForm.max" :min="0" :max="10000"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="收款状态">
                                <el-select v-model="dataForm.state" placeholder="付款状态" class="handle-select mr10">
                                    <el-option key="0" label="未收款" value="0"></el-option>
                                    <el-option key="1" label="部分收款" value="1"></el-option>
                                    <el-option key="2" label="收完款" value="2"></el-option>
                                    <el-option key="3" label="追加款" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="接单日期">
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
                            <el-form-item label="是否定金">
                                <el-select v-model="dataForm.isPay" placeholder="是否定金" class="handle-select mr10">
                                    <el-option key="1" label="未付" value="0"></el-option>
                                    <el-option key="2" label="已付" value="1"></el-option>
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

                <div class="header-right">
                    <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        图表<i class="el-icon-caret-bottom"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="drawSchart">schart图表</el-dropdown-item>
                            <el-dropdown-item @click.native="drawCurve">画稿曲线</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>

            <el-table :data="tableData" border class="table" ref="multipleTable" highlight-current-row
                      @selection-change="handleSelectionChange" :row-class-name="tableRowClassName"
                      :summary-method="getSummaries" @row-click="showRowItem"
                      show-summary>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="orderDate" label="接单日期" align="center" sortable width="130">
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
                <el-table-column prop="drawAmount" label="画稿金额(元)" sortable align="center" width="140">
                    <template slot-scope="scope">
                        <i class="el-icon-lx-redpacket_fill" style="font-size: 15px;color: #ff5900">{{scope.row.drawAmount | rounding}}</i>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="收款状态" align="center" width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.state == 0" type="info">{{ stateFormatter(scope.row.state) }}</el-tag>
                        <el-tag v-else-if="scope.row.state == 1" type="warning">{{ stateFormatter(scope.row.state) }}
                        </el-tag>
                        <el-tag v-else-if="scope.row.state == 2" type="success">{{ stateFormatter(scope.row.state) }}
                        </el-tag>
                        <el-tag v-else="scope.row.state == 3" type="primary">{{ stateFormatter(scope.row.state) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="confirmDate" label="完结时间" align="center" width="180"></el-table-column>
                <el-table-column prop="createUser" label="接单人" align="center" width="120"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-goods" @click="handleCash(scope.$index, scope.row)">收款
                        </el-button>
                        <el-button type="text" icon="el-icon-lx-tag" @click="confirm(scope.$index, scope.row)">确认
                        </el-button>
                        <el-button type="text" icon="el-icon-upload" @click="handleUpload(scope.$index, scope.row)">上传
                        </el-button>
                        <el-button type="text" icon="el-icon-lx-punch" @click="addCashHandle(scope.$index, scope.row)">补款
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
                        <el-table-column prop="cashDate" label="收款日期" align="center" :formatter="dataFormatter"></el-table-column>
                        <el-table-column prop="cashType" label="收款方式" align="center" :formatter="cashTypeFormatter"></el-table-column>
                        <el-table-column prop="cashUser" label="收款人" align="center"></el-table-column>
                        <el-table-column prop="getCash" label="收款金额" align="center"></el-table-column>
                        <el-table-column prop="assistCash" label="协助金额" align="center"></el-table-column>
                        <el-table-column prop="noGetCash" label="未收金额" align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="画稿详情" name="second">
                    <el-form :inline="true" :model="draw" class="demo-form-inline" label-width="200px">
                        <el-row :gutter="15">
                            <el-col :span="8">
                                <el-form-item label="定金金额" class="form-label">
                                    <el-input v-model="draw.deposit" style="width: 100%;" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="是否多人" class="form-label">
                                    <el-select v-model="draw.isMulti" :disabled="true">
                                        <el-option
                                            v-for="item in isMultiList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="用时天数" class="form-label">
                                    <el-input v-model="draw.consumeDays" style="width: 100%;" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="8">
                                <el-form-item label="扣税金额" class="form-label">
                                    <el-input v-model="draw.taxAmount" style="width: 100%;" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="协助费用" class="form-label">
                                    <el-input v-model="draw.assistCash" style="width: 100%;"
                                              :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="备注" class="form-label">
                                    <el-input type="textarea"  rows="2" v-model="draw.remark" style="width: 100%;" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="8">
                                <el-form-item label="追加金额" class="form-label">
                                    <el-input v-model="draw.addAmount" style="width: 100%;" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="未收金额" class="form-label">
                                    <el-input v-model="draw.leaveAmount" style="width: 100%;" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 收款弹出框 -->
        <el-dialog title="收款记录" :visible.sync="cashVisible" width="30%">
            <div style="margin-bottom: 10px"><font color="#FF0000">提示：画稿未收金额为{{leaveAmount}} </font></div>
            <el-form ref="cashForm" :model="cashForm" :rules="cashRule" label-width="80px">
                <el-form-item label="收款日期" prop="cashDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="cashForm.cashDate" value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 80%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="收款方式" prop="cashType">
                    <el-select v-model="cashForm.cashType" placeholder="请选择" style="width: 80%;">
                        <el-option
                            v-for="item in cashTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收款金额" style="width: 80%;" prop="getCash">
                    <el-input-number v-model="cashForm.getCash" :min="0" :max="10000"></el-input-number>
                </el-form-item>
                <el-form-item label="协助金额" style="width: 80%;">
                    <el-input-number v-model="cashForm.assistCash" :min="0" :max="10000"></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cashVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCashRecord">确 定</el-button>
            </span>
        </el-dialog>

        <!--上传弹框-->
        <el-dialog title="上传画稿" :visible.sync="uploadVisible" width="30%" @close="closeUpload">
            <el-upload align="center"
                       class="avatar-uploader"
                       :headers="token"
                       :action="uploadUrl"
                       :show-file-list="false"
                       :on-success="uploadImg"
                       :before-upload="beforeUpload">
                <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar img">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-dialog>

        <!-- 确认提示框 -->
        <el-dialog title="确认" :visible.sync="confirmVisible" width="20%">
            <div style="margin-bottom: 10px"><font color="#FF0000">提示：画稿未收金额为{{leaveAmount}} </font></div>
            <el-form :model="form" ref="form"  label-width="80px">
                <el-form-item label="扣税费用" >
                    <el-input-number v-model="form.taxAmount" :min="0" :max="2000"></el-input-number>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input type="textarea" rows="3" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <div class="del-dialog-cnt">此幅画稿是否收完款项，确定？</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="confirmVisible = false">取 消</el-button>
                <el-button type="primary" @click="complete()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 追加提示框 -->
        <el-dialog title="追加款项" :visible.sync="addCashVisible" width="20%">

            <div class="del-dialog-cnt">此幅画稿确定追加款项？</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCashVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCashConfirm()">确 定</el-button>
            </div>
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

        <!--查看画稿统计需要输入账号-->
        <el-dialog
            title="输入口令" width="450px"
            :close-on-click-modal="true"
            :visible.sync="passwdVisible">
            <el-form  :model="account" label-width="80px">
                <el-form-item label="问题" style="width: 80%;" prop="cashUser">
                 请输入口令？
                </el-form-item>
                <el-form-item label="回答" style="width: 80%;" prop="cashUser">
                    <el-input v-model="account.password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closePasswd">取 消</el-button>
                <el-button type="primary" @click="confirmPasswd">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import drawApi from '../../api/business/draw';
    import pagination from '../../components/common/pagination.vue';
    import moment from 'moment';
    import Vue from 'vue'

    export default {
        name: 'basetable',
        data() {
            return {
                params:{},
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
                token: {
                    token: sessionStorage.getItem('token'),
                },
                uploadUrl:Vue.prototype.global.SERVER_ADDRESS +'/business/draw/upload?drawId=' + this.drawId,
                activeName: 'first',
                drawId:null,
                picUrl: null,    //点击图片预览url
                uploadImgUrl:null,  //上传图片回显的url
                showVisible: false,
                pageData: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tableData: [],   //画稿列表
                cashDatas: [],   //收款明细
                cashForm:{},    //增加画稿收款记录
                form:{    //画稿确认
                    taxAmount:0,
                    remark:null
                },
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
                isMultiList: [{
                    value: 0,
                    label: "单人"
                }, {
                    value: 1,
                    label: "多人"
                }],
                draw: {},  //画稿详情
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
                addCashVisible:false,
                delVisible: false,
                idx: -1,
                account:{
                    schart:false,
                    curve:false,
                    password:null
                },
                drawState:{},// 更改画稿状态
                passwdVisible:false,
                leaveAmount:null,  //提示未收金额

                //定义校验规则
                cashRule: {
                    cashDate: [
                        {required: true, message: '请输入收款日期', trigger: 'change'}
                    ],
                    cashType: [
                        {required: true, message: '请选择收款方式', trigger: 'change'}
                    ],
                    getCash: [
                        {type:'number',required: true, message: '必须是数字',trigger: 'blur'}
                    ],
                    cashUser: [
                        {required: true, message: '请输入收款人', trigger: 'blur'}
                    ]
                },
            }
        },
        components: {
            "pagination": pagination
        },
        created() {
            this.query();
        },
        watch: {
            //普通的watch监听
            drawId(val, oldVal) {
                console.log("a: " + val)
            }
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
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            tableRowClassName({row, rowIndex}) {
                if (row.state === 0) {
                    return 'info-row';
                } else if (row.state === 1) {
                    return 'warning-row';
                } else if(row.state === 2){
                    return 'success-row';
                }
                return '';
            },
            query(pageNum, pageSize) {

                var param = this.dataForm;
                param.current = pageNum || 1;
                param.size = pageSize || this.pageData.pageSize;
                //判断是否选择日期
                if(Array.isArray(this.dataForm.dataValue) && this.dataForm.dataValue.length != 0){
                    param.beginTime = this.dataForm.dataValue[0];
                    param.endTime = this.dataForm.dataValue[1];
                }
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
            showRowItem(row, event, column){
                //展示画稿明细
                this.draw = row;
                var param = {"drawId":row.id};
                drawApi.queryDrawCash(param).then(data =>{
                    if (data && data.code == 0) {
                        this.cashDatas = data.list;
                    }else{
                        this.$message.error("查询收款记录失败!")
                    }
                })
            },
            showBigImg(url) {
                if(url != null){
                    this.showVisible = true
                    this.picUrl = url
                }
            },

            dataFormatter(row, column) {
                return moment(row.cashDate).format("YYYY-MM-DD");
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
                switch (value){
                    case 0:
                        return "未收款";
                        break;
                    case 1:
                        return "部分收款";
                         break;
                    case 2:
                        return "收完款";
                        break;
                    case 3:
                        return "追加款";
                        break;
                    default:
                        return "";
                    break;
                }
            },
            cashTypeFormatter(row, column){
                switch(row.cashType){
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
            beforeUpload(file){
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isRightType) {
                    this.$message.error('上传图片只能是 PNG,JPEG 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                    return false;
                }
                return true;
            },
            //画稿上传
            handleUpload(index, row) {
                this.drawId = row.id;
                this.uploadUrl = Vue.prototype.global.SERVER_ADDRESS +'/business/draw/upload?drawId=' + this.drawId,
                this.uploadVisible = true;
            },
            //上传成功
            uploadImg(res, file) {
                if (res.code == 0) {
                    this.$message.success(res.msg);
                    this.uploadImgUrl = res.url;
                    this.drawId = null;
                    //重新加载表格
                    this.query();
                }else{
                    this.$message.error(res.msg);
                }
            },
            //画稿上传之前预判断
            beforeImgUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            //关闭上传窗口
            closeUpload(){
                this.uploadImgUrl = null;
            },

            //收款弹窗
            handleCash(index, row) {

                //判断是否已经收完款
                if(row.state == 2){
                    this.$message.info("此幅画稿款项已经收完!")
                    return;
                }
                this.leaveAmount = row.leaveAmount;
                this.drawId = row.id;
                this.cashVisible = true;
            },
            //新增收款记录
            saveCashRecord(){
                this.$refs.cashForm.validate((valid) => {
                    if (valid) {
                        if(this.cashForm.getCash <= this.cashForm.assistCash){
                            this.$message.error("协助金额不能大等于收款金额!");
                            return;
                        }
                        this.cashForm.drawId = this.drawId;
                        drawApi.addCashRecord(this.cashForm).then(res => {
                            if (res && res.code == 0) {
                                this.$message.success(res.msg);
                                this.$refs.cashForm.resetFields();
                                this.cashForm = {}
                                this.leaveAmount = null;
                                this.cashVisible = false;
                                this.query();
                            }else{
                                this.$message.error(res.msg);
                            }
                        })
                    }
                })
            },
            //确认画稿弹窗
            confirm(index, row) {

                //判断是否已经收完款
                if(row.state == 0){
                    this.$message.info("此幅画稿还未收款!")
                    return;
                }
                if(row.state != 1){
                    this.$message.info("此幅画稿已收完款!")
                    return;
                }
                this.leaveAmount = row.leaveAmount;
                this.drawId = row.id;
                this.confirmVisible = true;
            },
            //确认画稿完结
            complete() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if(this.form.taxAmount == 0){
                            this.$message.error("扣税金额不能等于0");
                            return;
                        }
                        if(this.form.taxAmount < this.leaveAmount){
                            this.$message.error("扣税金额小于未收款金额,请备注信息!");
                            return;
                        }
                        this.form.drawId = this.drawId;
                        drawApi.completeDraw(this.form).then(res => {
                            if (res && res.code == 0) {
                                this.$message.success(res.msg);
                                this.$refs.form.resetFields();
                                this.form = {};
                                this.leaveAmount = null;
                                this.confirmVisible = false;
                                this.query();
                            }else{
                                this.$message.error(res.msg);
                            }
                        })
                    }
                })
            },
            //启用追加款项
            addCashHandle(index,row){
                //判断是否已经收完款
                if(row.state == 3){
                    this.$message.info("此幅画稿已是追加款项!")
                    return;
                }
                if(row.state != 2){
                    this.$message.info("此幅画稿款项未收完款,不能追加款项!")
                    return;
                }
                this.drawState.drawId = row.id;
                this.addCashVisible = true;
            },
            addCashConfirm(){
                drawApi.changeDrawState(this.drawState).then(res => {
                    if (res && res.code == 0) {
                        this.$message.success(res.msg);
                        this.addCashVisible = false;
                        this.query();
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },
            drawSchart(){
                this.account.schart = true;
                this.passwdVisible = true;
            },
            drawCurve(){
                this.account.curve = true;
                this.passwdVisible = true;
            },
            //前去图表统计页面
            confirmPasswd(){
                if(this.account.password == "666888"){
                    this.account.password = null;
                    this.passwdVisible = false;
                    if(this.account.schart){
                        this.account.schart = false;
                        this.$router.push("/charts");
                    }else if(this.account.curve){
                        this.account.curve = false;
                        this.$router.push("/echarts");
                    }else{
                        this.$message.error('请选择查看项!');
                    }

                }else{
                    this.$message.error('口令错误!');
                }
            },
            closePasswd(){
                this.account.schart = false;
                this.account.curve = false;
                this.account.password = null;
                this.passwdVisible = false;
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

    .img{
        width:inherit;
        height:inherit;
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

    .el-table .info-row {
        background: #d8c8fd;
    }

    .el-table .warning-row {
        background: #fdc650;
    }

    .el-table .success-row {
        background: #4b7ff9;
    }

    .header-right{
        float: right;
        padding-right: 50px;
    }

    .el-dropdown-link{
        color: #7dbaff;
        cursor: pointer;
    }
</style>
