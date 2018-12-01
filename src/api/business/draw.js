import Vue from "vue";

const url = '/business/draw';
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
     * 新增
     * @param 实体对象
     */
    addDriver(params) {
        return Vue.prototype.global.methodPost(url + '/addDriver', params);
    },
    /**
     * 更新
     * @param 实体对象
     */
    updateDriver(params) {
        return Vue.prototype.global.methodPost(url + '/updateDriver', params);
    },
    /**
     * 删除
     * @param 实体对象
     */
    deleteDriver(params) {
        return Vue.prototype.global.methodPost(url + '/deleteDriver', params);
    },

}
