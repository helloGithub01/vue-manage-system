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
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="画稿名称" prop="drawName">
                            <el-input v-model="form.drawName"  style="width: 80%;" placeholder="请输入画稿名称"></el-input>
                            <el-button type="primary">选择</el-button>
                    </el-form-item>
                    <el-form-item label="画稿类型" prop="drawType">
                        <el-select v-model="form.drawType" placeholder="请选择画稿类型">
                            <el-option key="1" label="风景" value="风景"></el-option>
                            <el-option key="2" label="人文" value="人文"></el-option>
                            <el-option key="3" label="地图" value="地图"></el-option>
                            <el-option key="4" label="美食" value="美食"></el-option>
                            <el-option key="5" label="物产" value="物产"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="接单日期" prop="orderDate">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="接单日期" v-model="form.orderDate" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="画稿金额" prop="drawAmount">
                        <el-input-number v-model="form.drawAmount" :min="0.00" :max="10000.00"></el-input-number>
                    </el-form-item>
                    <el-form-item label="是否定金">
                        <el-switch v-model="form.ifPay"></el-switch>
                    </el-form-item>
                    <el-form-item label="定金金额" v-show="form.ifPay">
                        <el-input-number v-model="form.deposit" :min="0.00" :max="2000.00"></el-input-number>
                    </el-form-item>

                    <el-form-item label="是否多人">
                        <el-switch v-model="form.ifMulti"></el-switch>
                    </el-form-item>
                    <el-form-item label="协助费用" v-show="form.ifMulti">
                        <el-input-number v-model="form.assistCash" :min="0.00" :max="2000.00"></el-input-number>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <el-upload
                            class="avatar-uploader"
                            :headers="token"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="uploadImg"
                            :before-upload="beforeImgUpload">
                            <img v-if="form.picUrl" :src="form.picUrl" class="avatar img">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="画稿来源" prop="source">
                        <el-radio-group v-model="form.source">
                            <el-radio label="十月微城"></el-radio>
                            <el-radio label="尘星文化"></el-radio>
                            <el-radio label="中国国家地理"></el-radio>
                            <el-radio label="散客"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="备注">
                        <el-input type="textarea" rows="5" v-model="form.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import drawApi from '../../api/business/draw';
    import Vue from 'vue'
    export default {
        name: 'baseform',
        data: function(){
            return {
                form: {
                    drawName: null,
                    drawType: null,
                    orderDate: null,
                    drawAmount: null,
                    ifPay: false,
                    isPay:null,
                    deposit: null,
                    ifMulti: false,
                    isMulti: null,
                    assistCash: null,
                    picUrl:null,
                    source:null,
                    remark: null
                },
                token: {
                    token: sessionStorage.getItem('token'),
                },
                uploadUrl:Vue.prototype.global.UPLOAD_IMG_ACCESS_URL,
                //定义校验规则
                rules: {
                    drawName : [
                        { required: true, message: '请输入画稿名称', trigger: 'blur' },
                    ],
                    drawType : [
                        { required: true, message: '请选择画稿类型', trigger: 'change' },
                    ],
                    orderDate : [
                        { required: true, message: '请输入订单日期', trigger: 'change' },
                    ],
                    drawAmount : [
                        { required: true, message: '请输入画稿金额', trigger: 'blur' },
                    ],
                    source : [
                        { required: true, message: '请选择画稿来源', trigger: 'change' },
                    ]
                }
            }
        },
        watch: {
            $route(to, from) {
                console.log(to);
                console.log(from);
            }
        },
        methods: {

            uploadImg(res, file) {
                if (res.code == 0) {
                    this.$message.success(res.msg);
                    this.form.picUrl = res.url;
                }else{
                    this.$message.error(res.msg);
                }
            },
            beforeImgUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png')|| (file.type === 'image/gif');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('只支持jpg、png、gif格式的图片！');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid){

                        if(this.form.deposit > this.form.drawAmount){
                            this.$message.error('定金不能大于画稿金额');
                            return;
                        }
                        if(this.form.assistCash > this.form.deposit){
                            this.$message.error('协助金额不能大于定金');
                            return;
                        }

                        this.form.isPay = (this.form.ifPay == true ? '1':'0');
                        this.form.isMulti = (this.form.ifMulti == true ? '1':'0');
                        drawApi.addBusinessDraw(this.form).then(res=>{
                            if(res && res.code == 0){
                                this.$message.success(res.msg);
                                this.$refs.form.resetFields();
                                this.form = {
                                    ifPay: false,
                                    isPay:null,
                                    deposit: null,
                                    ifMulti: false,
                                    isMulti: null,
                                    assistCash: null,
                                    picUrl:null,
                                    remark: null
                                },
                                this.$router.push("/table")
                            }else{
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        });
                    }else {
                        return false;
                    }
                })
            },
            //重置表单
            reset(){
                this.$refs.form.resetFields();
                this.$refs.form.clearValidate();
                this.form = {
                    ifPay: false,
                    isPay:null,
                    deposit: null,
                    ifMulti: false,
                    isMulti: null,
                    assistCash: null,
                    picUrl:null,
                    remark: null
                }
            },
        },
        created(){
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
    .img{
        width:inherit;
        height:inherit;
    }

</style>
