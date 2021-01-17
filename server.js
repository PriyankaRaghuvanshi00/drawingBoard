const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
const hbs=require('hbs');
app.set('view engine','hbs');
app.get('/',(req,res)=>{
    res.render('index')
})
app.listen(port);