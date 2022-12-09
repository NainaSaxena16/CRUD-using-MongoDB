const mongoose=require ('mongoose')

mongoose.connect('mongodb+srv://NainaSaxena:naina16@cluster0.4pthbds.mongodb.net/EMS?retryWrites=true&w=majority',(err)=>{
    if(err)
    console.log("Mongodb not Connected",err)
else
    console.log("Database Connected")
})

require('./employee.model')