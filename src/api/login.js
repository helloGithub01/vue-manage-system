import axios from 'axios';

let base = axios.defaults.baseURL;
/**
 * 登陆1
 * @param params
 * @returns {Promise.<TResult>}
 */
export const requestLogin = params => { return axios.post(`${base}/sys/login`, params).then(res => res.data); };
/**
 * 获取验证码
 * @param params
 * @returns {Promise.<TResult>}
 */
export const getCaptcha = params => { return axios.get(`${base}/captcha.jpg?uuid=`+ params)};
/**
 * 获取用户菜单1
 * @param params
 * @returns {Promise.<TResult>}
 */
export const requestUserMenus = params => { return axios.post(`${base}/auth/selectUserMenus`, params).then(res => res.data); };

/**
 * 注销
 * @param params
 */
export const requestLogout = params => {axios.post(`${base}/auth/logout`, params);};

/**
 * 获取用户信息
 * @param params
 * @returns {Promise.<TResult>}
 */
export const requestUserInfo = params => { return axios.post(`${base}/auth/selectUserInfo`, params).then(res => res.data); };
/**
 * 获取用户权限
 * @param params
 * @returns {Promise.<TResult>}
 */
export const requestUserPermission = params => { return axios.post(`${base}/user/permission`, params).then(res => res.data); };

/**
 * 修改用户登陆密码
 * @param params
 * @returns {Promise.<TResult>}
 */
export const requestChangeUserPassword = params => { return axios.post(`${base}/user/changepwd`, params).then(res => res.data);  }

