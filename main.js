const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
userRoutes(app);

app.get('/', (req, res) => res.send("óla mundo"))

app.listen(port, () => console.log('API rodando'))