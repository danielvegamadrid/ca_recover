function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const express = require('express');
const app = express();
// app.use(express.static('./dist/'));
app.use(express.static(__dirname, 'dist', {index: false}))
app.get('/*', function (req, res) {
    res.sendFile('src/index.html', { root: './' }
    );
});
app.listen(process.env.PORT || 8080);