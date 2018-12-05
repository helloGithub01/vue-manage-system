<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-emoji"></i> 画稿图片 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h2>图片</h2>
            <div class="search-box">
                <el-input class="search" size="large" v-model="keyword" clearable placeholder="请输入图标名称"></el-input>
            </div>
            <ul>
                <li class="icon-li" v-for="(item,index) in ImgList" :key="index">
                    <div class="icon-li-content">
                        <img :src="item.url" class="show-img" @click="showBigImg(item.url)"/>
                    </div>
                </li>
            </ul>
            <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :currentPage="pageData.pageNum"
                    :page-sizes="[10,15,25,30]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageData.total">
                </el-pagination>
            </div>
        </div>

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
    import ossApi from '../../../api/business/picture';

    export default {
        data: function(){
            return {
                keyword: '',
                ImgList:[],
                pageData: {
                    pageNum: 1,
                    pageSize: 10,
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

                var param = {};
                param.current = pageNum || 1;
                param.size = pageSize || this.pageData.pageSize;
                ossApi.selectListByPage(param).then(data => {

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
            handleSizeChange(val) {
                this.query(1,val);
            },
            handleCurrentChange(val) {
                this.query(val,this.pageData.pageSize);
            },
            showBigImg(url) {
                if(url != null){
                    this.showVisible = true
                    this.picUrl = url
                }
            },
        }
    }
</script>

<style scoped>
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
    width: 120px;
    height: 120px;
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
</style>
