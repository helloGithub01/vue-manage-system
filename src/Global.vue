<!--定义全局常量与变量-->
<template>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import router from './router'
    import {Message} from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';

    //服务器端地址
    let HOST = "127.0.0.1:8080";
    // HOST = HOST === '' ? 'localhost:8080' : HOST;
    const SERVER_ADDRESS = "http://"+HOST+"/renren-fast";  //本地环境
    const SERVER_URL = "http://localhost:9080/uias_user";  //本地环境地址
    const TOKEN = "token";
    const UPLOAD_IMG_ACCESS_URL="http://"+HOST+"/renren-fast/sys/oss/upload";//上传图片访问url

    //vue对message组件扩展
    Vue.$message = Message;

    // axios 配置
    axios.defaults.timeout = 30000;
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    axios.defaults.baseURL = SERVER_ADDRESS;

    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {

        //产生请求唯一ID，设置在请求头
        // config.headers['reqUid'] = genUid(32);

        //查看本地缓存localStorage中是否存在token,若没有则设置新token；localStorage为键值对形式存储
        let token = sessionStorage.getItem(TOKEN);
        if (token) {
            config.headers[TOKEN] = token;//若token存在,将其设置在请求头
        }

        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    //返回拦截器,对返回状态进行判断
    axios.interceptors.response.use((res) => {
        if (res != null) {
            var uri = res.config.url.replace(res.config.baseURL, '');
            if (uri != '/login' && uri != '/logout') {
                var code = res.data.code;
                if ( code == 3) {
                    Vue.$message.error(res.data.message);
                } else if (code == 401){
                    Vue.$message.error('登录状态已失效，请重新登陆!');
                    sessionStorage.removeItem('token');
                    router.push("/login");
                }
            }
        }
        return res;
    }, (error) => {
        if (error.toString().indexOf("Network Error") != -1) {
            Vue.$message.error('客户端网络断开，请重新链接网络');
        } else if (error.response > 500 && error.response.status) {
            Vue.$message.error('网络链接错误');
        } else if (error.response && error.response.status == 408) {
            Vue.$message.error('请求超时,请稍后重试');
        } else if (error.response && error.response.status == 404) {
            Vue.$message.error('网络异常');
        } else if (error.response && error.response.status == 401) {
            Vue.$message.error('对不起你没有权限!');
        } else if (error.message && error.message.indexOf("timeout") != -1) {
            Vue.$message.error('请求超时!');
        }
        return Promise.reject(error);
    });

    /**
     * 产生UID
     * @param {Object} len 长度
     * @param {Object} radix 因子
     */
    function getUUid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };

    /**
     * get 请求
     * @param url 请求的URL
     * @param params 请求参数
     * */
    function methodGet(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {params})
                .then(response => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    /**
     * post请求
     * @param url 请求URL
     * @param params 请求的参数
     * */
    function methodPost(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    function send(url, data, success, method = 'post') {
        let config = {
            url,
            data,
            method,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }
        axios.request(config)
            .then(response => {
                success(response)
            })
            //    .catch(e => vue.$vux.toast.text('请求失败，请稍后重试!', 3000, "bottom"))
            .catch(e => Vue.$vux.toast.show({
                text: '请求失败，请稍后重试!',
                type: 'text',
                time: 3000,
                position: 'bottom',
                width: '16em'
            }))
    }

    /**
     * 四舍五入=>toFixed四舍六入
     * @param amt 金额
     * @param  fixedNum 小数位
     * */
    function toFixed(amt, fixedNum) {
        if (amt != null && amt != undefined) {
            return amt.toFixed(fixedNum);
        }
        return amt;
    }

    function getSyncEnums(enumName) {
        var url = SERVER_ADDRESS + '/common/enumValues';
        url += "?enumName=" + enumName;
        return methodGet(url, {});
    }

    export default {
        SERVER_ADDRESS,
        SERVER_URL,
        TOKEN,
        UPLOAD_IMG_ACCESS_URL,
        methodGet,
        methodPost,
        getSyncEnums,
        send,
        toFixed,
        getUUid,
        components: {Message},
        methods: {},
        mounted() {
        }
    }
</script>
<style>

</style>
