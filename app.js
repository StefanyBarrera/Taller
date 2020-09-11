const express = require('express');
const path    = require('path');
const logger  = require('morgan');
const mongoose =require('mongoose');

const app = express();
//mongoose.connect('mongodb://68.183.22.32/Agenda-Telefonica')
mongoose.connect('mongodb://localhost/Agenda-Telefonica')
    .then(db=>console.log('Db connected'))
    .catch(err=> console.log(err))
app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));

app.set('port', 3000);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));


app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});

module.exports = app;