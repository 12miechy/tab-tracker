const express = require('express')
const bodyParser = require('body-parser')
const cors = require('morgan') 
const morgan = require('morgan');
//#note ↑が宣言されていなかったから、以下のエラーが出た。
//app.use(morgan('combined')) //←コレ、いらなかった。
//    ^
//ReferenceError: morgan is not defined

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// CORSを許可する
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// memo: app.getだとpostmanもgetを指定する必要がある。
//app.get('/status', (req, res) => {
app.post('/register', (req, res) => {
    res.send({
        message: `Hello ${req.body.email}! Your user was registered! Have fun!`
    })
})

app.listen(process.env.PORT || 8889)
/*var http = require("http");

// 8000番ポートでHTTPサーバ起動
http.createServer(function(request, response) {

   // レスポンスで返すHTTP header(with HTTP status Content type)
   response.writeHead(200, {'Content-Type': 'text/plain'});

   // レスポンスで返すbody
   response.end('Hello World\n');
}).listen(8889);

// 起動ログ
console.log('Server running at http://127.0.0.1:8889/');
*/