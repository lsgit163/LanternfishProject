import axios from 'axios'

export const Axios = axios.create({
  baseURL:  'https://todo.lanternfish.ai/auth',
  timeout: 10000,
})

//POST传参序列化(添加请求拦截器)
 // 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
    // 下面会说在什么时候存储 token
    if (localStorage.getItem('token')) {
        config.headers.Authorization = 'JWT ' + localStorage.getItem('token')
    }
    return config
},error =>{
    alert("错误的传参", 'fail')
    return Promise.reject(error)
})

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res =>{
   //对响应数据做些事
    if(!res.data.success){
       return Promise.reject(res)
    }
    return res
}, error => {
    if(error.response.status === 401) {
      // 401 说明 token 验证失败
      // 可以直接跳转到登录页面，重新登录获取 token
      location.href = '/login'
    } else if (error.response.status === 500) {
       // 服务器错误
       // do something
       return Promise.reject(error.response.data)
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.response.data)
})

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}
