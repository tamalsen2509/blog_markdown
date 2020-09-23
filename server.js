// dependencies 
let express = require('express');
let app = express();
let articleRouter = require('./routes/articles')
let mongoose = require('mongoose')
let Article = require('./models/article');
let methodOverRide  =  require('method-override');
let morgan = require('morgan');
require('dotenv').config();


// moddleware sction 

app.use(morgan('dev'));


// template engine set up 
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended : false }))
app.use(methodOverRide('_method'))
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex:true  })


app.get('/', async (req,res)=>{
    let articles = await Article.find().sort({
        createdAt : 'desc'
    })

    res.render('articles/index',{articles : articles})
} )


// port set up

let port = process.env.PORT || 5000
app.use('/articles', articleRouter);
app.listen(port,()=>{
    console.log(`app is listening at port: ${port}`)
}  );