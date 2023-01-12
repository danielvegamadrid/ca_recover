function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const express = require('express');
const app = express();
app.use(express.static(__dirname + 'dist', {index: false}))
// app.use(express.static(__dirname, 'dist', {index: false}))
// app.get('', function(req, res) {
//     res.sendFile(path.join(__dirname, 'src', 'index.html'));
// });

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'src', 'index.html'));
// });

const path = require('path');
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join('dist/index.html'), { root: './' });
});

// app.get('/*', function (req, res) {
//      res.sendFile('src/index.html', { root: './' }
//      );
// });
app.listen(process.env.PORT || 8080);