const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

///Config partials and view engine
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//Middleware
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) =>{
    err && console.log('Unable to append to server.log')
  })
  next();
});
app.use((req, res, next ) =>{
  res.render('maintenance.hbs',{
    pageTitle: 'Under Maintenance'
  })
})

///Helpers
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

///Endpoints
app.get('/',(req, res) => {
  res.render('home.hbs',{
    pageTitle:'Home',
    welcomeMessage: 'Welcome to my site',
  });
});

app.get('/about',(req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About page',
  });
})

app.get('/bad',(req, res) => {
  res.send({
    data: '',
    message: 'An error happened',
    statusCode: '404'
  })
})


app.listen(3000, () => {
  console.log('server is up on port 3000')
});
