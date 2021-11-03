import axios from 'axios'
import { Toast } from 'mint-ui';
import baseUrl from "./baseUrl"
let service = axios.create({
    timeout: 60000
})

service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'

//请求拦截
service.interceptors.request.use(
    (config) => {
        if (config.url == baseUrl+"/user/dologin" || config.url == baseUrl+"/user/reg") {
            return config
        } else {
            config.headers.common['Authorization'] = localStorage.getItem('token');
            return config
        }
    }, (error) => {
        Toast({ message: '请求超时' })
        return Promise.reject(error)
    }
)

//响应拦截(处理错误)
service.interceptors.response.use(
    (data) => {
        return data
    }, (err) => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400: err.message = '请求错误(400)'; break
                case 401: err.message = '未授权，请重新登录(401)'; break
                case 403: err.message = '拒绝访问(403)'; break
                case 404: err.message = '请求出错(404)'; break
                case 408: err.message = '请求超时(408)'; break
                case 500: err.message = '服务器出错(500)'; break
                case 501: err.message = '服务未实现(501)'; break
                case 502: err.message = '网络错误(502)'; break
                case 503: err.message = '服务不可用(503)'; break
                case 504: err.message = '网络超时(504)'; break
                case 505: err.message = 'HTTP版本不受支持(505)'; break
                default: err.message = `连接出错(${err.response.status})!`
            }
        } else {
            err.message="服务器连接失败";
        }
        Toast({message:err.message});
        return Promise.reject(err);
    }
)


export default service
