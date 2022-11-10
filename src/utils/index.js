/**
 * 导出一个封装好的axios实例
 */

// timeout of 10000ms exceeded

import axios from "axios";
import { ElMessage } from "element-plus";

// 超时时间
const timeout = 10000;

// 异常Message的映射
// const errorMessageMap = {
//     [`timeout of ${timeout}ms exceeded`]: "请求超时，请稍后重试~",
// };

// 创建一个 axios 实例
const request = axios.create({
    // 存放公共的一些配置项，baseUrl、timeout
    baseURL: "http://localhost:3000",
    // baseURL: "http://121.89.205.189:3000",
    timeout, // 单位 ms
});

// 请求拦截
// request.interceptors.request.use(
//     function (config) {
//         // 登录之后会将 token 存储到 localStorage 里面
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.token = token;
//         }
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );

// 响应拦截
// request.interceptors.response.use(
//     function (response) {
//         // 1. 取出真实的接口返回数据
//         const data = response.data;
//         // 2. 判断 data.code 是否等于 '200'
//         if (data.code === "200") {
//             ElMessage({
//                 message: data.message || "OJBK",
//                 type: "success",
//             });
//             return data;
//         } else {
//             // 让代码进去 catch
//             // alert(data.message);
//             // 将 alert 美化，使用 组件库 message 方法
//             ElMessage({
//                 message: data.message,
//                 type: "error",
//             });
//             return Promise.reject(data);
//         }
//     },
//     function (error) {
//         // 非 2xx 的响应做一些处理
//         ElMessage({
//             type: "error",
//             message: errorMessageMap[error.message] || "网络异常，请稍后重试~",
//         });

//         return Promise.reject(error);
//     }
// );


export default request;
