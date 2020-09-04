//create an instance of http server
const http= require('http');
const port = 4771;
const fs=require('fs');

//Serving a response to the browser --- a plain text
 function requestHandler(req, res){
     console.log(req.url);

     //setting response header
    res.writeHead(200,{'content-type':'text/html'});
    res.end("<h1>Hello!!</h1>")
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