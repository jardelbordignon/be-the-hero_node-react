
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // ./ para informar que é um arquivo e não um pacote
const app = express();

app.use(cors()); // permite restringir acesso de terceiros 
app.use(express.json());
app.use(routes);

app.listen(3333);