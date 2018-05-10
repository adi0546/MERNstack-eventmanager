var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//APIs
var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb')

var Events = require('./models/events'); 
// POST EVENTS
 
app.post('/events',function(req,res){
  var event=req.body;
  // console.log('assssssssssssssssssssss',req.body);
  Events.create(event,function(err,events){
    if(err)
    {
      throw err;
    }
    res.json(events);
  })}); 

  //GET EVENTS

  app.get('/events',function(req,res){
    Events.find(function(err,events){
      if(err){
        throw err;
      }
      res.json(events);
    })
  });

  //DEL EVENTS

  app.delete('/events/:_id',function(req,res){
    var query={_id: req.params._id};
    Events.remove(query,function(err,events){
      if(err){
        throw err;
      }
      res.json(events);
    })
  });

  //UPDATE EVENT
  app.put('/events/:_id',function(req,res)
{

  var event=req.body;
 
  var query={_id: req.params._id};
  // console.log('assssssssssssssssssssss',event,query);
  var update={
    '$set':{
      title:event.title,
      desc:event.desc,
      date:event.date,
      time:event.time,
      people:event.people
    }
  };
  var options={new:true};

  Events.findOneAndUpdate(query,update,function(err,events){
    if(err){
      throw err;
    }
    res.json(events);
  })
});
// API end


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// app.listen(9000);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
