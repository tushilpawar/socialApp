const express = require('express')
const app = express()
const format = require('date-format')

//swagger docs
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require('express-fileupload')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(fileUpload())

const PORT = process.env.PORT || 3000;

let courses =[
    {
        id: "11",
        name :'Learn React js',
        price: 299
    },
    {
        id: "12",
        name :'Learn Angular',
        price: 499
    },
    {
        id: "13",
        name :'Learn React Native',
        price: 999
    },
    
]

app.get("/api/v1/dev",(req,res) =>{
    res.status(200).send("hello from DEV")
})

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

app.get('/api/v1/devobject',(req, res) =>{
    res.send({id : "55", name:"Learn backend", price :999})
})
app.get('/api/v1/courses',(req, res) =>{
    res.send(courses)
})

app.post('/api/v1/courseupload',(req, res) =>{
    const file = req.files.file
    let path = `${__dirname}\\${Date.now()}.jpeg`
    console.log("path",path);
    file.mv(path, (err) =>{
        res.send(true)
    })
})

app.get("/api/v1/coursequery",( req, res) =>{
    let location = req.query.location
    let device = req.query.device

    res.send({location, device})
})
app.get("/api/v1/:token",(req, res)=>{
    console.log(req.params.token);
    res.status(200).json({
        param : req.params.token
    })
})

app.get("/api/v1/mycourse/:courseId",(req, res)=>{
    const myCourse = courses.find(i => i.id == req.params.courseId)
    res.send(myCourse)
})

app.post("/api/v1/addCourse",( req, res) =>{
    console.log(req.body);
    courses.push(req.body)
    res.send(true)
})



app.listen(PORT, ()=> {
    console.log(`Server is running at ${PORT}`);
})
