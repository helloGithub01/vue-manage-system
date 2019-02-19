import Vue from "vue";

const url = '/business/cash';
export default {
    name: "drawApi",
    /**
     * 分页查询
     * @param 分页对象
     */
    selectListByPage(params) {
        return Vue.prototype.global.methodPost(url + '/list', params);
    },


    /**
     * 按月统计查询
     * @param 分页对象
     */
    selectMonthDrawCash(params) {
        return Vue.prototype.global.methodPost(url + '/selectMonthCash', params);
    },


}
