const express=require('express')
const handlebars=require('handlebars')
const {engine}=require('express-handlebars')
const app=express()

const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access')


//middleware of express handlebars    //handle bar enbales us to write the common things at same place but the things which we need again and again are used by cleating a pplaceholder
app.engine('handlebars',engine({
    handlebars:allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine','handlebars');
app.set('views','./views');

require('./models/db')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port=3000
app.listen(3000,()=>console.log(`server is running at port ${port}`))

app.get("/",(req,res)=>{
res.send("<h1>hello express</h1>")
})

app.use("/emp",require('./controllers/employeeController'))