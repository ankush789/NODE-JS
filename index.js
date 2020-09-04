//create an instance of http server
const http= require('http');
const port = 4771;
const path = require('path');
// fs module is used to read and write into the files.
const fs=require('fs');

//Serving a response to the browser --- a plain text
 function requestHandler(req, res){
     console.log(req.url);
     let filePath;
    switch(req.url){
        case '/': 
        filePath = './index.html';
        break;
        case '/profile':
        filePath = './profile.html';
        break;
        default: 
        filePath= './404.html'
    }
     if (req.url === '/' || req.url === '/profile'){

        res.writeHead(200, { 'content-type': 'text/html' });
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log('ERROR:', err);
                return res.end('<h1>ERROR!!</h1>');
            }
            else {
                return res.end(data);
            }
        })
    }


    else if(req.url.match("\.css$")){
        var cssPath =path.join(__dirname,req.url);
        var fileStream =fs.createReadStream(cssPath , "UTF-8");
        res.writeHead(200, {"Content-type": "text/css"});
        fileStream.pipe(res);
    }
    else if(req.url.match("\.jpg$")){
        var imagePath = path.join(__dirname,req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200,{"Content-type": "image/png"});
        fileStream.pipe(res);
    }
    else {
        res.writeHead(404, {"Content-type":"text/html"});
        res.end("No page found!!");
    }
 }
 // https://www.youtube.com/watch?v=-p8RiJvxCRo
 
//creating a server 
const server = http.createServer(requestHandler);

//Assigning a port to the server
server.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up and running  on ", port);
});