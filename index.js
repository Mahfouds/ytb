const express=require('express')

const app=express()
app.use(express.json())
const mongoose=require('mongoose')
const Article=require('./models/Article')
mongoose.connect("mongodb://mah:mah123@ac-6uktlkj-shard-00-00.9czxwgu.mongodb.net:27017,ac-6uktlkj-shard-00-01.9czxwgu.mongodb.net:27017,ac-6uktlkj-shard-00-02.9czxwgu.mongodb.net:27017/?ssl=true&replicaSet=atlas-9rvllm-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(()=>{
console.log("success")
}).catch((err)=>{
    console.log("errror : "+err);
});
// mongodb+srv://<username>:Ss13126%40%23@cluster0.9czxwgu.mongodb.net/?retryWrites=true&w=majority
// mongodb://<username>:<password>@ac-6uktlkj-shard-00-00.9czxwgu.mongodb.net:27017,ac-6uktlkj-shard-00-01.9czxwgu.mongodb.net:27017,ac-6uktlkj-shard-00-02.9czxwgu.mongodb.net:27017/?ssl=true&replicaSet=atlas-9rvllm-shard-0&authSource=admin&retryWrites=true&w=majority

app.get("/",(req,res)=>{
    res.send("hello to you too")
})
app.post("/hello",(req,res)=>{
    res.send("hello im post")
})
//path parameters
app.get("/somme/:number1/:number2",(req,res)=>{
    console.log(req.params)
    res.send(`somme est : ${Number(req.params.number1) + Number(req.params.number2)}`)
})

//body para
app.get("/sommeWithBodyParams",(req,res)=>{
    console.log(req.body)
    res.send(req.body.name)
})

//query para 
app.get("/sommeWithBodyParamss",(req,res)=>{
    console.log(req.query)
    res.send(req.query)
})

app.get("/json",(req,res)=>{
    //console.log(req.query)
    res.json({
        id:"dd",
        name:"deedd",
        //age:req.query.age,
        obj:req.query
    })
})

//return page html
app.get("/htmlPage",(req,res)=>{
    //console.log(req.query)
    res.sendFile(__dirname+"/vues/numbers.html")
})

//ejs
app.get("/ejs",(req,res)=>{
    //console.log(req.query)
    res.render("numbers.ejs")
})

//ejs with var
app.get("/ejsWithVar",(req,res)=>{
    //console.log(req.query)
    res.render("numbers.ejs",{
        name:"mahfoud",
        age:30
    })
})

app.post("/somme",(req,res)=>{

})


//Article end points 
app.post("/article",async (req,res)=>{
    const newArticle=new Article();
    newArticle.title=req.body.title
    newArticle.description=req.body.description
    newArticle.numOfLikes=req.body.nums
    await newArticle.save()

    res.send(newArticle)
})

app.get("/articles",async (req,res)=>{
    const articles = await Article.find();
    res.json(articles)
})
app.get("/article/:articleId",async (req,res)=>{
    try{
    const articles = await Article.findById(req.params.articleId);
    res.json(articles)
    }catch{
        console.log("error")
    }
    
})

app.delete("/article/:articleId",async (req,res)=>{
    try{
        
        res.json(await Article.findByIdAndDelete(req.params.articleId))
        return
    }catch{
        console.log("error")
        return res.send("error in delete")
    }
})

app.get("/showArticles",async (req,res)=>{
    try{
        const articles=await Article.find();
        res.render("show.ejs",{
            allArticles:articles
        })
        //res.json(articles)
        return
    }catch(error){
        console.log("error")
        return res.json(error)
    }
})

app.listen(3000,()=>{
    console.log("iam listening on port 3000")
})