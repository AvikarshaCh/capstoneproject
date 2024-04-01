require('dotenv').config();
const http = require('http');
const app = require('./app');


let port = process.env.PORT || 8888;
let host = process.env.HOST;



// let server = http.createServer((req, res)=>{
//     res.write("server created successfully");
//     res.end();
// });

let server = http.createServer(app);

server.listen(9999, ()=>{
    console.log(`server is started on ${host}:${port}...`);
});