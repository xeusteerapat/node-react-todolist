const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
const app = express();

const db = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/tasks', todoRoutes);

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log(`Server is running on 8000`);
  });
});
