
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');



const app = express();
app.use(cors());
app.use(bodyparser.json());

//database connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'projetangular',
    port:3306
});

//get all products
app.get('/product', (req,res)=>{
    let qr = 'select * from product';
    db.query(qr,(err,result)=>{
        if (err) 
        {
            console.log(err,'errs');
        }
        if (result.length>0)
        {
            res.send({
                message:'all product data',
                data:result
            });
        }
    });
});

//get all data
app.get('/user', (req,res)=>{
    let qr = 'select * from user';
    db.query(qr,(err,result)=>{
        if (err) 
        {
            console.log(err,'errs');
        }
        if (result.length>0)
        {
            res.send({
                message:'all user data',
                data:result
            });
        }
    });
});

//get product by id
app.get('/product/:id',(req,res)=>{
    let gID = req.params.id;
    let qr = `select * from product where id= ${gID}`;
    db.query(qr,(err,result)=>{
        if (err) 
        {
            console.log(err,'errs');
        }
        if (result.length>0)
        {
            res.send({
                message:'get product by id',
                data:result
            });
        }
        else {
            res.send({
                message:'data not found'
            });
        }
    });
})

//get user by id
app.get('/user/:id',(req,res)=>{
    let gID = req.params.id;
    let qr = `select * from user where id= ${gID}`;
    db.query(qr,(err,result)=>{
        if (err) 
        {
            console.log(err,'errs');
        }
        if (result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else {
            res.send({
                message:'data not found'
            });
        }
    });
});

//check database Connection
db.connect(err=>{
    if (err) {console.log(err,'dberr');}
    console.log('database connected ...');
})

//create product
app.post('/product',(req,res)=>{
    console.log(req.body,'createproduct');

    let name = req.body.name;
    let price = req.body.price;
    let dispo = req.body.disponibility;
    let catego = req.body.category;
    let pic = req.body.pic;
    let qr = `insert into product (name,price,disponibility,pic,category) values('${name}','${price}','${dispo}','${pic}','${catego}')`;
    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err);
        }
       console.log(result,'result')
            res.send({
                message:'product inserted'
         
            });
    });
});

//update product
app.put('/product/:id',(req,res)=>{

    console.log(req.body,'updateproduct');

    let gID=req.params.id;
    let name = req.body.name;
    let price = req.body.price;
    let dispo = req.body.disponibility;
    let catego = req.body.category;
    let qr=`update product set  name='${name}' , price='${price}' , disponibility='${dispo}' , category='${catego}' where id = ${gID}`;
    db.query (qr,(err,result)=>{
        if (err) {
            console.log(err);

        }
        res.send({
            message:'product updated'
        });

    });
    
});

//delete product 
app.delete('/product/:id',(req,res)=>{
    let qID = req.params.id;
    let qr = `delete from product where id = '${qID}'` ;
    db.query(qr,(err,result)=>{
        if  (err) {
            console.log(err);
         }
         res.send({
             message:'product deleted'
         });
    });

});

//create user
app.post('/user',(req,res)=>{
    console.log(req.body,'createdata');

    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mob = req.body.mobile;
    let pass = req.body.password;
    let qr = `insert into user (fullname,email,mobile,password) values('${fullName}','${eMail}','${mob}','${pass}')`;
    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err);
        }
       console.log(result,'result')
            res.send({
                message:'data inserted'
         
            });
    });
});

//update user
app.put('/user/:id',(req,res)=>{

    console.log(req.body,'updatedata');

    let gID=req.params.id;
    let fullName = req.body.fullName;
    let eMail = req.body.email;
    let mob = req.body.mobile;
    let pass = req.body.password;
    let qr=`update user set  fullname='${fullName}' , eMail='${email}' , mob='${mobile}' , pass='${password}' where id = ${gID}`;
    db.query (qr,(err,result)=>{
        if (err) {
            console.log(err);

        }
        res.send({
            message:'user updated'
        });

    });
    
});

//delete user by id 
app.delete('/user/:id',(req,res)=>{
    let qID = req.params.id;
    let qr = `delete from user where id = '${qID}'` ;
    db.query(qr,(err,result)=>{
        if  (err) {
            console.log(err);
         }
         res.send({
             message:'user deleted'
         });
    });

});

//get product by category name
app.get('/product/:category',(req,res)=>{
    let catego = req.body.category;
    let qr = `select * from product where category= ${catego}`;
    db.query(qr,(err,result)=>{
        if (err) 
        {
            console.log(err,'errs');
        }
        if (result.length>0)
        {
            res.send({
                message:'get product by id',
                data:result
            });
        }
        else {
            res.send({
                message:'data not found'
            });
        }
    });
})



app.listen(3000,()=>{
    console.log('server running..');
});