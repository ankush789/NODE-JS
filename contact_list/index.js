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

//Using string params
app.get('/delete-contact', (req,res)=>{
    //console.log(req.query);
    let phone = req.query.phone;
    let name = req.query.name;
    var arrayIndex = contacts.findIndex(contact => contact.phone == phone && contact.name == name);

    if (arrayIndex!=-1){
        contacts.splice(arrayIndex,1);
    }
    return res.redirect('back');
});



app.listen(port, (err)=>{
    if(err){
        console.log("ERROR occured!!")
    }
    console.log("Express server is running over the port :", port);
})