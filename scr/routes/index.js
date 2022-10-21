const newRouter =require('./news')
function route(app){
app.use('/news',newRouter)
}

module.exports = route;
