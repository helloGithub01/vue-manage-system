<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="画稿名称">
                            <el-input v-model="form.name"  style="width: 80%;"></el-input>
                            <el-button type="primary">选择</el-button>
                    </el-form-item>
                    <el-form-item label="画稿类型">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="接单日期">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="接单日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="画稿金额">
                        <el-input-number v-model="form.price" :min="0" :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="是否定金">
                        <el-switch v-model="form.delivery2"></el-switch>
                    </el-form-item>
                    <el-form-item label="定金金额" v-show="form.delivery2">
                        <el-input-number v-model="form.qwe" :min="0" :max="2000"></el-input-number>
                    </el-form-item>

                    <el-form-item label="是否收款">
                        <el-switch v-model="form.delivery"></el-switch>
                        <el-button @click="addCashCount" v-show="form.delivery" type="warning">新增</el-button>
                    </el-form-item>
                    <!--<el-form-item label="日期-金额" v-show="form.delivery">-->
                    <!--<el-col :span="10">-->
                        <!--<el-date-picker placeholder="收款日期" v-model="form.date2" style="width: 100%;"></el-date-picker>-->
                    <!--</el-col>-->
                    <!--<el-col class="line" :span="2">-</el-col>-->
                    <!--<el-col :span="8">-->
                        <!--<el-input-number v-model="form.qwe" :min="0" :max="2000"></el-input-number>-->
                    <!--</el-col>-->
                    <!--<el-col :span="2">-->
                        <!--<el-button type="info" @click.prevent="removeDomain(domain)">删除</el-button>-->
                    <!--</el-col>-->
                <!--</el-form-item>-->
                    <el-form-item v-show="form.delivery"
                        v-for="(domain, index) in form.cashCount"
                        :label="'日期-金额'"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'">
                        <el-col :span="10">
                            <el-date-picker placeholder="收款日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="8">
                            <el-input-number v-model="form.qwe" :min="0" :max="2000"></el-input-number>
                        </el-col>
                        <el-col :span="2" v-show="index > 0">
                            <el-button type="info" @click.prevent="removeCash(domain)">删除</el-button>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="是否多人">
                        <el-switch v-model="form.delivery1"></el-switch>
                    </el-form-item>
                    <el-form-item label="协助费用" v-show="form.delivery1">
                        <el-input-number v-model="form.qwe" :min="0" :max="2000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <el-upload
                            class="avatar-uploader"
                            :action="123"
                            :show-file-list="false"
                            :on-success="uploadImg"
                            :before-upload="123">
                            <img v-if="false" :src="123" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="画稿特征">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="风景" name="type"></el-checkbox>
                            <el-checkbox label="地图" name="type"></el-checkbox>
                            <el-checkbox label="人物" name="type"></el-checkbox>
                            <el-checkbox label="食品" name="type"></el-checkbox>
                            <el-checkbox label="杂志" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="画稿来源">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="十月微城"></el-radio>
                            <el-radio label="尘星文化"></el-radio>
                            <el-radio label="中国国家地理"></el-radio>
                            <el-radio label="散客"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="备注">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import drawApi from '../../api/business/draw';
    export default {
        name: 'baseform',
        data: function(){
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    delivery1: false,
                    type: ['步步高'],
                    cashCount:[ {value: ''}],
                    resource: '小天才',
                    desc: '',
                    options: []
                },
                options:[
                    {
                        value: 'ditu',
                        label: '地图',
                        children: [
                            {
                                value: 'guangzhou',
                                label: '风景',
                                children: [
                                    {
                                        value: 'tianhe',
                                        label: '自然旅游'
                                    },
                                    {
                                        value: 'haizhu',
                                        label: '人工开发'
                                    }
                                ]
                            },
                            {
                                value: 'dongguan',
                                label: '人文',
                                children: [
                                    {
                                        value: 'changan',
                                        label: '商业'
                                    },
                                    {
                                        value: 'humen',
                                        label: '自营'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'zazhishe',
                        label: '杂志社',
                        children: [
                            {
                                value: 'changsha',
                                label: '社刊',
                                children: [
                                    {
                                        value: 'yuelu',
                                        label: '美食'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            query(pageNum,pageSize){
                var params = {
                    pageNum : pageNum || 1,
                    pageSize : pageSize || this.pageData.pageSize,
                    typeName : this.viewData.typeName,
                    typeValue : this.viewData.typeValue,
                    isUseable : this.viewData.isUseable
                }
                dicTypeApi.selectListByPage(params).then(res=>{
                    this.viewData.items = res.data.list;
                    this.pageData.total = res.data.total;
                    this.pageData.pageNum = params.pageNum;
                    this.pageData.pageSize = params.pageSize;
                });
            },
            addCashCount(){
                //值最大为3 先判断
                if(this.form.cashCount.length < 3) {
                    this.form.cashCount.push({
                        value: '',
                        key: Date.now()
                    });
                }
            },
            removeCash(item) {
                var index = this.form.cashCount.indexOf(item)
                if (index !== -1) {
                    this.form.cashCount.splice(index, 1)
                }
            },
            onSubmit() {
console.log(this.form)
                this.$message.success('提交成功！');
                this.$router.push("/table")
            }
        },
        created(){
            this.query();
        }
    }
</script>
<style scoped>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

</style>
