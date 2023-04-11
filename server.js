const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const methods = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(flash());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json())
app.use(methods("_method"))
app.use(express.static("image"))
// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.end(JSON.stringify({
//         success: true,
//     }))
// })

app.use(session({
    secret: 'sassa2',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())
const port = 9999;
const controllers = require('./controllers/controlersAdmin');
mongoose.connect('mongodb://127.0.0.1:27017/Quan_Ly_Quan_Ao')
    .then(function () {
        console.log("ket noi thanh cong !")
    })
    .catch(function (err) {
        console.log("error: " + err)
    })
app.engine('.hbs', handlebars.engine({
    extname: "hbs",
    helpers: {
        sum: (a, b) => a + b
    }
}))
app.set('view engine', '.hbs');
app.set('views', './views');

app.use("/admin", controllers)
app.use(express.static('uploads'))

app.listen(port, function () {
    console.log("running port " + port)
})