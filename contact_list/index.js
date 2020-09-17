const express = require('express');
const path = require('path');
const { get } = require('http');
const port = 8800;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();
app.use(express.urlencoded());
app.use(express.static('assets'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

const contacts = [
    {
        name:"ankush",
        phone:8800880088
    },
    {
        name:"akon",
        phone:9678896756
    },
    {
        name:"david",
        phone: 8956234575
    }
];

// fetching data from database
app.get('/',(req,res)=>{
    Contact.find({}, function(err, contact){
        if(err){
            console.log("Error fetching Data fro database.");
            return;
        }
        return res.render('home', { title: "ANKUSH", contact_list: contact });
    })
    
});
app.get('/practice',(req,res)=>{
    return res.render('practice');
});

//saving form data to the database
app.post('/create-contact', (req,res)=>{
    Contact.create(req.body,function(err,createContact){
        if(err){
            console.log("Error: ", err);
            return;
        }
        console.log("***********", createContact);
        return res.redirect('back');
    });
    
});

//deleting a contact
app.get('/delete-contact', (req,res)=>{
    //get the id from query in the url
    let id = req.query.id;
   
    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error in deleting an object from the database");
            return;
        }
    return res.redirect("back");
        
    })
});



app.listen(port, (err)=>{
    if(err){
        console.log("ERROR occured!!")
    }
    console.log("Express server is running over the port :", port);
})