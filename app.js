var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var suppliersRouter = require('./routes/suppliers');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 使用 session 中间件
app.use(session({
	secret: "aldsijflkadsjfalkdsfjlkdsajf",
	cookie : {
		iaxAge : 30 * 60 * 1000
	}
}));

// 权限认证
app.use(function(req, res, next){
// 判断请求资源的URL
const {url} = req;
if (url.endsWith(".html") && url !== "/") { // 访问其它页面资源
	if(url=="/html/login.html"){
		next();
	}else{
		if(req.session.loginUser) // 已有登录用户
      	next(); // 继续访问
    else { // 没有登录用户，跳转到首页
      res.redirect("/");
      return;
    }
   } 
} else {
    next();
}
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api/user', usersRouter);

app.use("/api/supplier", suppliersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
