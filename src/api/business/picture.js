import Vue from "vue";

const url = '/business/draw';
export default {
    name: "ossApi",
    /**
     * 分页查询画稿图片
     * @param 分页对象
     */
    selectListByPage(params) {
        return Vue.prototype.global.methodPost(url + '/listImg', params);
    },

    /**
     * 上传画稿
     * @param 实体对象
     */
    uploadImg(drawId) {
        return Vue.prototype.global.SERVER_ADDRESS + url+"/upload?drawId=" + drawId;
    },


}
