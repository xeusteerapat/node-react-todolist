const express = require('express');
const router = express.Router();

const db = require('../models');

// Create a new todo
router.post('/', async (req, res) => {
  const { task } = req.body;
  try {
    const newTask = await db.Task.create({
      isCompleted: false,
      task
    });
    res.status(201).send(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err);
  }
});

// Retrieve all todos
router.get('/', async (req, res) => {
  try {
    const todos = await db.Task.findAll();
    res.status(200).send(todos);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err);
  }
});

// Retrieve single todo
router.get('/:id', async (req, res) => {
  try {
    const task = await db.Task.findOne({
      where: { id: Number(req.params.id) }
    });
    res.status(200).send(task);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err);
  }
});

// Update todo by id
router.put('/:id', async (req, res) => {
  const { task } = req.body;

  try {
    const updatedTask = await db.Task.update(
      {
        task,
        isCompleted: Boolean(Number(req.body.isCompleted))
      },
      { where: { id: Number(req.params.id) } }
    );
    res.status(200).send(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err);
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const deleteTask = await db.Task.destroy({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err);
  }
});

module.exports = router;
