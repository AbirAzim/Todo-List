const express = require('express');
const todoController = require('./controller/todoController');

const app = express();

//set template engine
app.set('view engine','ejs');

app.use(express.static('./public'));

todoController(app);

app.listen(3000,function(){
    console.log('port 3000');
})

