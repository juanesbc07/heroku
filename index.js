const express = require('express');
const routes = require('./app/controllers/routes');
const DB = require('./app/config/database');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.use("/api/banco", routes);

app.listen(PORT, () => {
  console.log('Escuchando puerto:', PORT);
});

module.exports = app;
