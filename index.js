// 实现图书管理系统后台接口

const exprss = require('express')
const app = exprss()
const router = require('./router.js')
const bodyParser = require('body-parser')

// 托管静态资源
app.use('/www',exprss.static('public'))

// 处理请求参数
// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式的参数
app.use(bodyParser.json());

app.use(router)

app.listen(3000,()=>{
    console.log('running')
})