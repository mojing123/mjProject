var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

var index = require("./routes/index");
var users = require("./routes/users");
var news = require("./routes/news");
var test = require("./routes/test");
var cate = require("./routes/cate");
var upload = require("./routes/upload");

var cart = require("./routes/cart");     // 购物车

var comment = require("./routes/comment");
var product = require("./routes/product");
var app = express();

mongoose.connect("mongodb://localhost/my_database");

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);
app.use("/news", news);
app.use("/test", test);
app.use("/cate", cate);
app.use("/upload", upload);
app.use("/comment",comment);
app.use("/product",product);

app.use("/cart", cart);      // 购物车

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
