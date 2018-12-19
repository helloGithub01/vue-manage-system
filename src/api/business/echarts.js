import Vue from "vue";

const url = '/draw/statis';
export default {
    name: "echartsApi",
    /**
     * 查询各月份 金额数
     * @param 分页对象
     */
    selectDrawAmountList() {
        return Vue.prototype.global.methodPost(url + '/drawAmount/echarts');
    },

    /**
     * 查询画稿总 已收 未收 金额数
     * @param 实体对象
     */
    selectOrderAmounts() {
        return Vue.prototype.global.methodPost(url + '/orderAmounts');
    },

    /**
     * 查询画稿类型金额数
     * @param 实体对象
     */
    selectDrawTypeAmount() {
        return Vue.prototype.global.methodPost(url + '/selectDrawTypeAmount');
    },

    /**
     * 查询画稿客户金额数
     * @param 实体对象
     */
    selectDrawSourceAmount() {
        return Vue.prototype.global.methodPost(url + '/selectDrawSourceAmount');
    },

    /**
     * 查询画稿占比金额数
     * @param 实体对象
     */
    selectDrawRateAmount() {
        return Vue.prototype.global.methodPost(url + '/selectDrawRateAmount');
    },


}
