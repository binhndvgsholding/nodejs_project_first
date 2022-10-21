class NewsController {
   //GET /news
    index(req,res){
        res.send('Hello fpt polytechnic!')
    }
    show(){
        res.send('Hello fpt polytechnic!')
    }

    
}
module.exports =new NewsController