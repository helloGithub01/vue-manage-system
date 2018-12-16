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
    addBusinessDraw(params) {
        return Vue.prototype.global.methodPost(url + '/save', params);
    },

    /**
     * 上传画稿
     * @param 实体对象
     */
    uploadImg(drawId) {
        return Vue.prototype.global.SERVER_ADDRESS + url+"/upload?drawId=" + drawId;
    },

    /**
     * 增加画稿收款记录
     * @param 实体对象
     */
    addCashRecord(params) {
        return Vue.prototype.global.methodPost(url + '/addCashRecord', params);
    },

    /**
     * 查看画稿收款记录
     * @param 实体对象
     */
    queryDrawCash(params) {
        return Vue.prototype.global.methodPost(url + '/queryDrawCash', params);
    },

    /**
     * 确认画稿收款完结
     * @param 实体对象
     */
    completeDraw(params) {
        return Vue.prototype.global.methodPost(url + '/complete', params);
    },

}
