/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

const TODO_DATA_FILE = path.join(__dirname, 'todos.json');

app.get('/api/todos', (req, res) => {
    fs.readFile(TODO_DATA_FILE, (err, data) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    });
});

app.delete('/api/todos', (req, res) => {
    fs.readFile(TODO_DATA_FILE, (err, data) => {
        let todos = JSON.parse(data);
        todos[req.body.listName] = todos[req.body.listName].reduce((memo, todo) => {
            if (todo.id === req.body.id) {
                return memo;
            } else {
                return memo.concat(todo);
            }
        }, []);
        fs.writeFile(TODO_DATA_FILE, JSON.stringify(todos, null, 4), () => {
            res.json({});
        });
    });
});

app.post('/api/todos', (req, res) => {
    fs.readFile(TODO_DATA_FILE, (err, data) => {
        const todos = JSON.parse(data);
        const newTodo = {
            title: req.body.title,
            id: req.body.id,
            status: req.body.status,
            createdOn: req.body.createdOn,
            completedOn: req.body.completedOn
        };
        todos[req.body.listName].push(newTodo);
        fs.writeFile(TODO_DATA_FILE, JSON.stringify(todos, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(todos);
        });
    });
});

app.put('/api/todos', (req, res) => {
    fs.readFile(TODO_DATA_FILE, (err, data) => {
        const todos = JSON.parse(data);
        todos[req.body.listName].forEach((todo) => {
            if (todo.id === req.body.id) {
                todo.title = req.body.title;
            }
        });
        fs.writeFile(TODO_DATA_FILE, JSON.stringify(todos, null, 4), () => {
            res.json({});
        });
    });
});

app.post('/api/todos/moveTask', (req, res) => {
    fs.readFile(TODO_DATA_FILE, (err, data) => {
        const todos = JSON.parse(data);
        const task = req.body.task;
        todos[req.body.toList].push({
            id: task.id,
            title: task.title,
            createdOn: task.createdOn,
            completedOn: task.completedOn,
            status: task.status
        });
        todos[req.body.fromList] = todos[req.body.fromList].reduce((memo, todo) => {
            if (todo.id === task.id) {
                return memo;
            } else {
                return memo.concat(todo);
            }
        }, []);
        fs.writeFile(TODO_DATA_FILE, JSON.stringify(todos, null, 4), () => {
            res.json({});
        });
    });
});



app.get('/molasses', (_, res) => {
  setTimeout(() => {
    res.end();
  }, 5000);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
