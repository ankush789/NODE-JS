//create an instance of http server
const http= require('http');
const port = 4771;

// fs module is used to read and write into the files.
const fs=require('fs');

//Serving a response to the browser --- a plain text
 function requestHandler(req, res){
     console.log(req.url);

     //setting response header
    res.writeHead(200,{'content-type':'text/html'});
    
    fs.readFile('./index.html',(err ,data)=>{
        if(err){
            console.log('ERROR:', err);
            return res.end('<h1>ERROR!!</h1>');
        }
        else{
            return res.end(data);
        }
    })

 }

 
//creating a server 
const server = http.createServer(requestHandler);

//Assigning a port to the server
server.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up and running on port:", port);
});