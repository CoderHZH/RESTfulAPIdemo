// 封装天气查询模块
// 调用第三方接口 获取天气信息

const http = require('http')
const querystring = require('querystring')

exports.queryWeather = (cityCode, callback) => {
    let options = {
        protocol: 'http:',
        hostname: 'www.weather.com.cn',
        port: 80,
        path: '/data/sk/' + cityCode + '.html',
        method: 'get'
    }

    let req = http.request(options, (res) => {
        let data = ''
        res.on('data', (chunk) => {
            data += chunk
        })
        res.on('end', () => {
            data = JSON.parse(data)
            callback(data)
        })
    })

    req.end()
}