const db = require('./db')
const weather = require('./weather')

exports.allBooks = (req,res) => {
    let sql = 'select * from book'
    db.base(sql,null,(result)=>{
        res.json(result)
    })
}

exports.addBook = (req,res) => {
    let param = req.body
    let sql = 'insert into book set ?'
    db.base(sql,param,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag: 1})
        }else{
            res.json({flag: 2})
        }
    })
}

exports.getBookById = (req,res) => {
    let id = req.params.id
    let sql = 'select * from book where id=?'
    let data = [id]
    db.base(sql,data,(result)=>{
        res.json(result[0])
    })
}

exports.editBook = (req,res) => {
    let param = req.body
    let sql = 'update book set name=?,author=?,category=?,description=? where id=?'
    let data = [param.name,param.author,param.category,param.description,param.id]
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag: 1})
        }else{
            res.json({flag: 2})
        }
    })
}

exports.delBook = (req,res) => {
    let id = req.params.id
    let sql = 'delete from book where id=?'
    let data = [id]
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag: 1})
        }else{
            res.json({flag: 2})
        }
    })
}

exports.queryWeather = (req,res) => {
    let cityCode = req.params.id
    weather.queryWeather(cityCode,(data)=>{
        res.json({info: data.weatherinfo})
    })
}