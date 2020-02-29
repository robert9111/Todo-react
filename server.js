const express = require('express');
const connectDB = require('./config/db');

// set up app
const app = express();
const PORT = 5000 || process.env.PORT;
// Connect DB
connectDB();



// Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json({ extended: false }));

// Routes
app.use('/todo', require('./routes/todo'));

app.get('/', (req, res, next) => {
    res.json({ msg:"At index"});
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
