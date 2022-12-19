// Creates an Express application. The express() function is a top-level function exported by the express module.
const express = require('express');
const path = require('path');
const port = 8000;

// Adding body parser
const bodyParser = require('body-parser');

// Getting mongoose 
const mongoose = require('./config/mongoose');

// Getting the task model
const Task = require('./models/task');

// Making an app using express
const app = express();

// Setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting up static directory
app.use(express.static('assets'));

// Home page controller
app.get('/', (req, res) => {
    
    Task.find({}, (err, tasks) => {
        if(err){
            console.log(`Error in fetching tasks from database: ${err}`);
            return res.redirect('back');
        }else{
            return res.render('todolist', {
                title: "To Do List",
                taskList: tasks,
                categoryValues: Task.schema.path('category').enumValues
            });
        }
    })
});

// Create task controller
app.post('/create-task', (req, res) => {
    Task.create({
        description: req.body.description,
        dueDate: req.body.dueDate,
        category: req.body.category
    }, (err, newTask) => {
        if(err){
            console.log(`Error in creating a new task: ${err}`);
            return;
        }
        // Can do console.log(newTask) to log the new task
        return res.redirect('back');
    });
});

// Delete completed tasks controller
app.post('/delete-completed-task', (req, res) => {
    Task.deleteMany({done: true}, (err) => {
        if(err){
            console.log(`Error in deleting tasks from database: ${err}`);
            return;
        }
    });
    return res.redirect('back');
});

// Toggle task controller using the checkbox
app.get('/toggle-task', (req, res) => {
    let id = req.query.id;
    
    Task.findOne({_id: id}, (err, task) => {
        if(err){
            console.log(`Error in finding task: ${err}`);
            return;
        }
        task.done = !task.done;
        task.save((err, updatedTask) => {
            if(err){
                console.log(`Error in saving updated task: ${err}`);
                return;
            }
            return res.redirect('back');
        })
    });
});

// Binds and listens for connections on the specified host and port
app.listen(port, (err) => {
    if (err) { console.log(`Error in running the server: ${err}`); }

    console.log(`Server is running on port: ${port}`);
});