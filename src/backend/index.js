let express=require('express');
let cors=require('cors');
let mongoose=require('mongoose');
let app=express();
let userModel=require("./model/user-schema")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
let PORT=9000

let dbURL="mongodb+srv://default-user:default123@firstevercluster.jsitxrg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURL)
.then(()=>{
    console.log("Database connected!")
})
.catch(err=>{
    console.log(err);
})

app.post("/register",(req,res)=>{
    let {name,email,password}=req.body;

    userModel.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User account already exists!"})
        }
        else{
            let userReg=new userModel({
                name,
                email,
                password
            })
            userReg.save()
            .then(()=>{
                res.send({message:"User's registered"})
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})

app.post("/login",(req,res)=>{
    let {email,password}=req.body;
    userModel.findOne({email:email},(err,user)=>{
        if(user){
            if(user.password===password){
                let userName=user.name
                res.send({message:"Login successful!",userName})
            }
            else{
                res.send({message:"Wrong credentials!"})
            }
        }
        else{
            res.send({message:"Wrong credentials!"})
        }
    })
})

app.get("/",(req,res)=>{
    res.send("Hey there!")
})

app.listen(process.env.PORT||PORT)