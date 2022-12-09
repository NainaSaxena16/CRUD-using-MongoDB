const { response } = require('express')
const express=require('express')
const mongoose=require('mongoose')
const router= express.Router()
const Employee=require('../models/employee.model')

router.get("/showAllEmp",(req,res)=>{
    res.send("<h1>Show All Employee</h1>")
})

router.get("/createEmp",(req,res)=>{
    res.render('add')
})

router.post('/addEmp',(req,res)=>{
//console.log(req.body)
const {name,email,pass,city,phone}=req.body
let Emp =new Employee()
Emp.name=name
Emp.password=pass
Emp.email=email
Emp.mobile=phone
Emp.city=city

Emp.save((err,result)=>{
    if(err) console.log("error",err)
else{
    //console.log(result)
    res.redirect('/emp/list')
}
})
})

router.get("/list",(req,res)=>{
    Employee.find((err,result)=>{
    if(err) console.log(err)
    else{
        //console.log(result)
    res.render('list',{employeeList:result})}
    })
})

router.get("/delete/:id",(req,res)=>{
    //console.log(req.params.id)
    Employee.findByIdAndDelete(req.params.id,(err,result)=>{
        if(err) console.log(err)
        else{
            res.redirect('/emp/list')
        }
    })
})

router.get("/update/:id",(req,res)=>{
    Employee.findById(req.params.id,(err,result)=>{
        if(err) console.log(err)
        res.render('update',{emp:result})
        //console.log(result)
    })
   //res.render('update') 
})

router.post("/updateEmp",(req,res)=>{
    //Employee.findOneAndUpdate({_id:req.body.id},{name:req.body.name,email:req.body.email,password:req.body.password,city:req.body.city,mobile:req.body.mobile},req.body,{new:true},(err,result)=>{
      //  if(err) console.log(err)
       // else{
       //     console.log(result)
       // }
    //})
    //console.log(req.body)
    const updateobj={name:req.body.name,email:req.body.email,mobile:req.body.phone,city:req.body.city,password:req.body.password}
    console.log(updateobj)
    Employee.findByIdAndUpdate(req.body.id,updateobj,{new:true},(err,result)=>{

        if(!err) res.redirect("/emp/list")
        else{console.log(err)}
    })
    })

module.exports=router