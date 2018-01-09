var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database mlab test
mongoose.connect('mongodb://test:test@ds243285.mlab.com:43285/todo-list');

//making the schema
var schema = new mongoose.Schema({
    item : String
});

//creating model
var Todo = mongoose.model('Todo',schema);




var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
    app.get('/todo',(req,res)=>{
        //get data from mongoose and pass it to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos : data });
        });
    });

    app.post('/todo',urlencodedParser,(req,res)=>{
        //get data from view and add it to mdb
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });       
    });

   app.delete('/todo/:item',(req,res)=>{
       Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
           if(err) throw err;
           res.json(data);
       });
   });
}