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
     * 更新
     * @param 实体对象
     */
    updateBusinessDraw(params) {
        return Vue.prototype.global.methodPost(url + '/update', params);
    },
    /**
     * 删除
     * @param 实体对象
     */
    deleteBusinessDraw(params) {
        return Vue.prototype.global.methodPost(url + '/delete', params);
    },

}
