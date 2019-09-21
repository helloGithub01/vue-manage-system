import Vue from "vue";

const url = '/sys/log';
export default {
    name: "logApi",

    /**
     * 查询订单记录
     * @param 分页对象
     */
    selectLogPageList(params) {
        return Vue.prototype.global.methodPost(url + '/list',params);
    },

}
