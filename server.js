const express = require("express");
const articleRouter = require("./routes/articles");
const Article = require("./models/article")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const app = express();
// //db
require("dotenv").config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
}); 
//??
// mongoose.connect("mongodb://localhost/blog",{ useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))


app.get("/",async (req, res) => {
  const articles =await Article.find().sort({createdAt:"desc"})
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
app.get("/description",(req,res)=>{
  res.render('description')
})

app.listen(5500,()=>{
  console.log("http://localhost:5500/")
});
