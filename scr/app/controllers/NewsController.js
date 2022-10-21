const newModel = require('../models/News')
class NewsController {
   //GET /news
    index(req,res){
      const a =  newModel.newIndex()
        res.send('Hello fpt polytechnic '+ a)
    }
    show(){
        res.send('Hello fpt polytechnic!')
    }
    showvlfk(){
        res.send('Hello fpt polytechnic!')
    }
}
module.exports =new NewsController