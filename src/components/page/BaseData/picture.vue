<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-emoji"></i> 画稿图片 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h2>图片</h2>
            <!--<div class="search-box">-->
                <!--<el-input class="search" size="large" v-model="keyword" clearable placeholder="请输入图标名称"></el-input>-->
            <!--</div>-->
            <ul>
                <li class="icon-li" v-for="(item,index) in ImgList" :key="index">
                    <div class="icon-li-content">
                        <img :src="item.picUrl" class="show-img" @click="showBigImg(index)"/>
                    </div>
                </li>
            </ul>

            <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :currentPage="pageData.pageNum"
                    :page-sizes="[10,20,40,50]"
                    :page-size="pageData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageData.total">
                </el-pagination>
            </div>
        </div>

        <el-dialog
            title="预览大图"
            :close-on-click-modal="true"
            height="100%" width="70%"
            :visible.sync="showVisible">
            <div class="item">
                <img :src="picUrl" width="80%"/>
                <div class="right">
                    <div><font color="#411183">接单日期:</font> <i class="el-icon-lx-time" style="font-size: 18px;color: #2b33ff">{{dateFormatter(drawData.orderDate)}}</i></div>
                    <div><font color="#411183">画稿名称:</font> {{drawData.drawName}}</div>
                    <div><font color="#411183">画稿客户:</font> {{drawData.source}}</div>
                    <div><font color="#411183">画稿金额:</font> <i class="el-icon-lx-redpacket_fill" style="font-size: 18px;color: #ff5900">{{drawData.drawAmount}}</i></div>
                    <div><font color="#411183">画稿类型:</font> {{drawData.drawType}}</div>
                    <div><font color="#411183">收款状态:</font> <el-tag  type="success">{{ stateFormatter(drawData.state)}}</el-tag></div>
                    <div>收款详情:
                        <router-link :to="{path:'/cashTable',query: {id: id}}">
                           <i  type="primary" style="font-size: 15px;color: #ff5900" class="el-icon-view el-icon--right">跳转链接</i>
                        </router-link>
                    </div>
                </div>
            </div>
            <!--<el-carousel :interval="5000" arrow="always" height="500px">-->
                <!--<el-carousel-item v-for="(item,index) in ImgList" :key="index">-->
                <!--</el-carousel-item>-->
            <!--</el-carousel>-->

        </el-dialog>
    </div>
</template>

<script>
    import ossApi from '../../../api/business/picture';
    import drawApi from '../../../api/business/draw';
    import moment from 'moment';

    export default {
        data: function(){
            return {
                //用于传递跳转参数
                id:null,
                keyword: '',
                ImgList:[],
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                drawData:{
                    drawName:null,
                    orderDate:null,
                    source:null,
                    drawType:null,
                    drawAmount:null,
                    state:null
                },
                pageData: {
                    pageNum: 1,
                    pageSize: 40,
                    total: 0
                },
                showVisible:false,
                picUrl:null,
                iconList: [
                    'attentionforbid',
                    'attentionforbidfill',
                    'attention',
                    'attentionfill',
                    'tag',
                    'tagfill',
                    'people',
                    'peoplefill',
                    'notice',
                    'noticefill',
                    'mobile',
                    'mobilefill',
                    'voice',
                    'voicefill',
                    'unlock',
                    'lock',
                    'home',
                    'homefill',
                    'delete',
                    'deletefill',
                    'notification',
                    'notificationfill',
                    'notificationforbidfill',
                    'like',
                    'likefill',
                    'comment',
                    'commentfill',
                    'camera',
                    'camerafill',
                    'warn',
                    'warnfill',
                    'time',
                    'timefill',
                    'location',
                    'locationfill',
                    'favor',
                    'favorfill',
                    'skin',
                    'skinfill',
                    'news',
                    'newsfill',
                    'record',
                    'recordfill',
                    'emoji',
                    'emojifill',
                    'message',
                    'messagefill',
                    'goods',
                    'goodsfill',
                    'crown',
                    'crownfill',
                    'move',
                    'add',
                    'hot',
                    'hotfill',
                    'service',
                    'servicefill',
                    'present',
                    'presentfill',
                    'pic',
                    'picfill',
                    'rank',
                    'rankfill',
                    'male',
                    'female',
                    'down',
                    'top',
                    'recharge',
                    'rechargefill',
                    'forward',
                    'forwardfill',
                    'info',
                    'infofill',
                    'redpacket',
                    'redpacket_fill',
                    'roundadd',
                    'roundaddfill',
                    'friendadd',
                    'friendaddfill',
                    'cart',
                    'cartfill',
                    'more',
                    'moreandroid',
                    'back',
                    'right',
                    'shop',
                    'shopfill',
                    'question',
                    'questionfill',
                    'roundclose',
                    'roundclosefill',
                    'roundcheck',
                    'roundcheckfill',
                    'global',
                    'mail',
                    'punch',
                    'exit',
                    'upload',
                    'read',
                    'file',
                    'link',
                    'full',
                    'group',
                    'friend',
                    'profile',
                    'addressbook',
                    'calendar',
                    'text',
                    'copy',
                    'share',
                    'wifi',
                    'vipcard',
                    'weibo',
                    'remind',
                    'refresh',
                    'filter',
                    'settings',
                    'scan',
                    'qrcode',
                    'cascades',
                    'apps',
                    'sort',
                    'searchlist',
                    'search',
                    'edit'
                ]
            }
        },
        computed: {
            list(){
                return this.iconList.filter((item) => {
                    return item.indexOf(this.keyword) !== -1;
                })
            }
        },
        created() {
            this.query();
        },
        methods:{
            query(pageNum, pageSize) {

                var param = {
                    picUrl:"yes",
                    min: 0,
                    max: 0,
                };
                param.current = pageNum || 1;
                param.size = pageSize || this.pageData.pageSize;
                //展示图片相关信息(调用此接口)
                drawApi.selectListByPage(param).then(data => {
                    if (data && data.code == 0) {
                        this.ImgList = data.page.list;
                        this.pageData.total = data.page.totalCount;
                    } else {
                        this.ImgList = []
                        this.pageData.total = 0
                    }
                    this.pageData.pageNum = param.current;
                    this.pageData.pageSize = param.size;
                });
            },
            dateFormatter(value) {
                return moment(value).format("YYYY-MM-DD");
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
            handleSizeChange(val) {
                this.query(1,val);
            },
            handleCurrentChange(val) {
                this.query(val,this.pageData.pageSize);
            },
            showBigImg(index) {
                if(index != null){
                    this.showVisible = true
                    this.picUrl = this.ImgList[index].picUrl
                    this.drawData =  this.ImgList[index]
                    this.id = this.ImgList[index].id
                }
            },
        }
    }
</script>

<style scoped>

    .el-carousel__item img {
        position: relative;
        left: 30px;
        top: 30px;
    }
.example-p{
    height: 45px;
    display: flex;
    align-items: center;
}
.search-box{
    text-align: center;
    margin-top: 10px;
}
.search{
    width: 300px;
}
ul,li{
    list-style: none;
}
.icon-li{
    display: inline-block;
    padding: 10px;
    width: 130px;
    height: 130px;
}
.icon-li-content{
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon-li-content i{
    font-size: 36px;
    color: #606266;
}
.icon-li-content span{
    margin-top: 10px;
    color: #787878;
}

    .show-img{
        width:90%;
        height:90%;
    }

    .item div{
        display: inline-block;
    }

    .right {
        position: absolute;
        width: 240px;
        right: 10px;
        padding: 10px;
        /*text-align: center;*/
    }

    .right div{
        /*display: flex;*/
        /*flex-flow:row wrap;*/
        /*align-items:center;*/
        /*text-align: center;*/
        padding: 10px;
        font-size: 20px;
    }
</style>
