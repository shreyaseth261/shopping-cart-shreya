const express = require("express")
const mysql=require("mysql")
const cors=require("cors")
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer")
const path = require("path")

const app = express();

//middleware
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:3000"],
}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public/uploads"))

//Database connection
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"shopping_cart"
})

//image storage

const storage = multer.diskStorage({
    destination:"./public/uploads",
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

//Image uploads

const upload = multer({
    storage:storage,
    limits:1024*1024*10,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    }
}).single('img')

checkFileType = (file,cb)=>{
    const filetype=/jpeg|jpg|png/

    const extension = filetype.test(path.extname(file.originalname).toLowerCase())

    const mimetype = filetype.test(file.mimetype)

    if(extension && mimetype){
        cb(null,true)
    }
    else{
        cb({err:"Please upload a photo only."})
    }
}

//post photo
app.post("/img",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            if(req.file==undefined){
                res.send({err:"No images found"})
            }
            else{
                db.query("insert into shopping_cart.products (photo) values(?)",[`/${req.file.filename}`])
                res.send({file:`/${req.file.filename}`})
            }
        }
    })
})

//Posting the product
app.post("/product",(req,res)=>{
    const price=req.body.price
    const quantity=req.body.quantity
    const item=req.body.item
    const category=req.body.category
    const img=req.body.img
    db.query("update shopping_cart.products set price=?,stock=?,name=?,category=? where photo=?",[price,quantity,item,category,img],(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result){
            res.send("added")
        }
        else{
            res.send("fail")
        }
    })

})

//Get Products
app.get("/products",(req,res)=>{
    db.query("select * from shopping_cart.products",(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result){
            res.send(result)
        }
        else{
            res.send({err:"No products found"})
        }
    })
})


//User Signup

app.post("/signup",(req,res)=>{
    const username=req.body.username
    const email=req.body.email
    const password=req.body.password

    db.query("insert into shopping_cart.users (username,email,password) values (?,?,?)",[username,email,password],(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result){
            res.send("User registered")
        }
        else{
            res.json({err:"User already exists"})
        }
    })
})

//User Login

app.post("/login",(req,res)=>{
    const email=req.body.email
    const password=req.body.password

    if(email=="admin@gmail.com" && password=="admin@123"){
        db.query("select id from shopping_cart.users where binary email=? and binary password=?",[email,password],(err,result)=>{
            if(err){
                console.log(err)
            }
            if(result){
                const admintoken=jwt.sign({id:result[0].id},"shreyashoppingcart")
                res.cookie("adminjwt",admintoken,{httpOnly:true})
                res.json({
                    admin:"admin authenticated"
                })
            }
            else{
                res.json({err:"Admin not authenticated."})
            }
        })
    }
    else{
        db.query("select id from shopping_cart.users where binary email=? and binary password=?",[email,password],(err,result)=>{
            if(err){
                console.log(err)
            }
            if(result!=""){
                const token = jwt.sign({id:result[0].id},"shreyashoppingcart")
                res.cookie("jwt",token,{httpOnly:true})
                res.send("User successfully logged in")
            }
            else{
                res.json({err:"User does not exists."})
            }
        })
    }
    
})

//User verify

app.get("/user",(req,res)=>{
    const cookie=req.cookies.jwt;
    if(!cookie){
        res.json({err:"User not authenticated."})
    }
    else{
        jwt.verify(cookie,"shreyashoppingcart",(err,user)=>{
            if(err){
                console.log(err)
            }
            if(user){
                const id=user.id;
                db.query("select username from shopping_cart.users where id=?",[id],(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    if(result){
                        res.json({username:result[0].username,id:id})
                    }
                    else{
                        res.json({err:"User not authenticated."})
                    }
                })
            }
        })
    }
})

//Admin verify

app.get("/admin",(req,res)=>{
    const cookie=req.cookies.adminjwt//variable cookie storing adminjwt token
    if(!cookie){
        res.json({err:"Admin not verified."})
    }
    else{
        jwt.verify(cookie,"shreyashoppingcart",(err,user)=>{
            if(err){
                console.log(err)
            }
            if(user){
                const id=user.id;
                res.send("admin authenticated")
            }
            else{
                res.json({err:"admin not authenticated"})
            }
        })
    }
})

//Logout

app.get("/logout",(req,res)=>{
    if(res.clearCookie("jwt"))
    {
        res.send("User Logged Out.")
    }
    else
    {
        res.json({err:"User Failed to logout!"})
    }
    

})

//admin logout
app.get("/adminlogout",(req,res)=>{
    if(res.clearCookie("adminjwt"))
    {
        res.send("User Logged Out.")
    }
    else
    {
        res.json({err:"User Failed to logout!"})
    }
    

})

//Restock
app.post("/restock",(req,res)=>{
    const productid=req.body.productid
    const stock = req.body.stock
    db.query("update shopping_cart.products set stock=? where product_id=?",[stock,productid],(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result){
            res.send("Restock Success")
        }
        else{
            res.send("Restock fail")
        }
    })

})

//Edit Item
app.post("/edit",(req,res)=>{
    const productid=req.body.productid
    const name=req.body.name
    const price=req.body.price

    db.query("update shopping_cart.products set name=?,price=? where product_id=?",[name,price,productid],(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result){
            res.send("Product edited")
        }
        else{
            res.send("Not edited")
        }
    })
})

app.listen(3001,()=>{
    console.log("running at port 3001")
})


