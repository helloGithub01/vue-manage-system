<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                    <el-row :gutter="20">
                        <el-col :span="14">
                            <el-input v-model="ruleForm.captcha" placeholder="验证码">
                            </el-input>
                        </el-col>
                        <el-col :span="10" class="login-captcha">
                            <img :src="captchaPath" @click="getCaptcha()" alt="验证码">
                        </el-col>
                    </el-row>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="logining">登录</el-button>
                </div>
                <p class="login-tips">Tips : 欢迎你的光临。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { requestLogin,getCaptcha} from '../../api/login';
    import UUidUtils from '../../Global'
    export default {
        data: function(){
            return {
                logining: false,
                captchaPath:'',
                ruleForm: {
                    username: 'admin',
                    password: '123456',
                    captcha:''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    captcha: [
                        { required: true, message: '验证码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
             // 获取验证码
             getCaptcha () {
                 this.ruleForm.uuid = UUidUtils.getUUid(32,"");
                 // this.captchaPath =  getCaptcha(this.ruleForm.uuid);
                 this.captchaPath =  Vue.prototype.global.SERVER_ADDRESS+"/captcha.jpg?uuid="+this.ruleForm.uuid;
             },
            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    this.logining = true;
                    if (valid) {
                        localStorage.setItem('ms_username',this.ruleForm.username);
                        // sessionStorage.setItem('ms_username',this.ruleForm.username);
                        this.$router.push('/');

                        var loginParams = { username: this.ruleForm.username, passwd: this.ruleForm.password };
                        //判断复选框是否被勾选 勾选则调用配置cookie方法

                        sessionStorage.removeItem('Token');
                        requestLogin(loginParams).then(data => {
                            this.logining = false;
                            let code =data.code;
                            let mes=data.message;
                            if (code !== 0) {
                                this.$message({
                                    message: mes,
                                    type: 'error'
                                });
                            } else {
                                let { returnToken , userCode} = data.data;
                                sessionStorage.setItem('userCode', userCode);
                                sessionStorage.setItem('Token', returnToken);

                            }
                        });
                    } else {
                        this.logining = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created () {
            this.getCaptcha();
        },
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:400px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-captcha {
        overflow: hidden;
    }
     img {
        width: 100%;
        height: 50%;
        cursor: pointer;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>
