const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your_secret_key', // It's recommended to use an environment variable for this
    resave: false,
    saveUninitialized: true
}));

// Routes
const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const adminRouter = require('./routes/admin');

app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
