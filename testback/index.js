const express = require("express");

const app = express();

port = 8000;

app.get('/', (req,res) => res.send('Hello, world'));
app.get('/signup', (req,res) => res.send('signup'));

app.listen(port,() => {
    console.log('server is up and running...')
});