const express = require('express')
const app = express()
const format = require('date-format')

const PORT = 3000 || process.env.PORT;

app.get("/",(req,res)=>{
    res.status(200).send("Hello WOrld")
})



app.get("/api/v1/instagram",(req,res) =>{
    const instaSocial = {
        username :"tushilpawar",
        followers:23,
        follows:30,
        date: format.asString("dd[MM] -hh:mm:ss",new Date())
    }

    res.status(200).json({instaSocial})
})

app.get("/api/v1/linkedin",(req,res) =>{
    const instaSocial = {
        username :"tushilpawarlinkedin",
        followers:23,
        follows:30,
        date: Date.now()
    }

    res.status(200).json({instaSocial})
})

app.get("/api/v1/facebook",(req,res) =>{
    const instaSocial = {
        username :"tushilpawarfacebook",
        followers:23,
        follows:30,
        date: Date.now()
    }

    res.status(200).json({instaSocial})
})

app.get("/api/v1/:token",(req, res)=>{
    console.log(req.params.token);
    res.status(200).json({
        param : req.params.token
    })
})

app.listen(PORT, ()=> {
    console.log(`Server is running at ${PORT}`);
})
