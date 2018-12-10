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

app.get('/status', (req, res) => {
    res.send({
        message: 'hello world!'
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