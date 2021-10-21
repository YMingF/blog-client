import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://blog-server.hunger-valley.com'
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
  //resolve和reject分别代表异步操作执行成功和失败后的回调函数
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type
    }
    if(type.toLowerCase() === 'get') {
      option.params = data  //params是添加到url的请求字符串中的，用于get请求。
    }else {
      option.data = data    //data是添加到请求体（body）中的， 用于post请求。
    }
    //这里是不是就是根据axios向对应的网址按照对应的方式去发送请求，res就是成功后获得的数据
    axios(option).then(res => {
      console.log(res.data)
      if(res.data.status === 'ok') {
        resolve(res.data) //括号内的数据会被接收返回值的对象获取到
      }else{
        Message.error(res.data.msg)
        reject(res.data) //reject用来返回错误的信息
      }
    }).catch(err => { //catch用来捕获错误信息.
      Message.error('网络异常')
      reject({ msg: '网络异常' })
    })
  })
}


// request('/auth/login', 'POST', {username: 'hunger', password: '123456'})
//   .then(data=>{
//     console.log(data)
//   })
