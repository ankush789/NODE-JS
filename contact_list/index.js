const express = require('express');
const path = require('path');
const { get } = require('http');
const port = 8800;

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    return res.render('home', {title: "ANKUSH"});
});
app.get('/practice',(req,res)=>{
    return res.render('practice');
});


app.listen(port, (err)=>{
    if(err){
        console.log("ERROR occured!!")
    }
    console.log("Express server is running over the port :", port);
})