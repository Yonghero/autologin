# autologin

### 背景

多个子系统的接口鉴权信息依赖于一个登录系统，意味着子系统并无自己的登录授权，在开发环境下我们想调试子系统的功能时，必需先去测试环境上的登录系统进行登录获取权限数据，再将权限数据复制粘贴到子系统内，这样的操作无疑非常麻烦，毫不夸张的说这样的操作我已经经历上百次。

```此项目的诞生正是为了解决此问题，一次声明，n次省心。```

### 缺陷

目前只支持使用**axios**做为请求库的项目可以使用


**用法**
```
$ npm i @yonghero/autologin
```

```ts
// request.js

import { AutoLogin } from '@yonghero/autologin'

// 系统内声明的axios实例
const request = axios.create({})

// AutoLogin 为本库所导出的构造函数
// 构造函数第一个参数：存储权限的函数返回Promise<boolean>·
// 调用withAxios 采用axios作为请求库，传入实例
const autologin = new AutoLogin(getAuth).withAxios(request)

// 请求获取权限数据的接口，存储权限数据，需要返回一个Promise<boolean>
async function setToken() {
  const { token } = await request({ url: '/login' })
  sessionStorage.setItem('Bearear', token)
  return true
}

// axios 拦截器
equest.interceptors.response.use(
  response => ({}), // 请求成功的处理，此处省略,,,
  (error) => {
    // 401 代表无权限
    // 此处调用autologin 进行无感登录
    if (error.response.status === 401) {
      // 需要传递config
      return autologin(error.response.config)
    }
    // ... anyCode
  },
)
```



