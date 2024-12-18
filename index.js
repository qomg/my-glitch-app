const express = require('express');

const app = express();
console.log(process.versions)
let port = process.env.PORT || 3000;
console.log(port)

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}

app.use(express.static('monica', options))
// app.use(express.static('owl', options))

app.get('/', (req, res) => {
  res.end(JSON.stringify(process.versions, null, 2));
});
app.listen(port);
