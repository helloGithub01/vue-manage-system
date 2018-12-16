import Vue from "vue";

const url = '/draw/statis';
export default {
    name: "statisApi",

    /**
     * 查询订单记录
     * @param 分页对象
     */
    selectOrderRecord() {
        return Vue.prototype.global.methodPost(url + '/orderRecord');
    },

    /**
     * 查询画稿金额数
     * @param 实体对象
     */
    selectOrderAmounts() {
        return Vue.prototype.global.methodPost(url + '/orderAmounts');
    },

    /**
     * 查询画稿最新几次未收款
     */
    queryNoReceiveRecord() {
        return Vue.prototype.global.methodPost(url + '/queryNoReceive');
    },

}
