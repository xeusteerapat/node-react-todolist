const express = require('express');
const _ = require('lodash');
const router = express.Router();

const taskList = [];

// Create a new todo
router.post('/', (req, res) => {
  const { task } = req.body;
  const newTask = {
    id: Number(_.uniqueId()),
    isCompleted: false,
    task
  };
  taskList.push(newTask);
  res.status(201).send(newTask);
});

// Read todos
router.get('/', (req, res) => {
  res.status(200).send(taskList);
});

// Retrieve single todo by id
router.get('/:id', (req, res) => {
  const targetId = Number(req.params.id);
  res.status(200).send(taskList.find(task => task.id === targetId));
});

// Update todo
router.put('/:id', (req, res) => {
  const targetId = Number(req.params.id);
  const targetIndex = taskList.findIndex(task => task.id === targetId);

  taskList[targetIndex] = {
    id: targetId,
    task: req.body.task ? req.body.task : taskList[targetIndex].task,
    isCompleted: Boolean(Number(req.body.isCompleted))
  };

  res.status(204).send(taskList[targetIndex]);
});

// Delete todo
router.delete('/:id', (req, res) => {
  const targetId = Number(req.params.id);
  const targetIndex = taskList.findIndex(task => task.id === targetId);

  taskList.splice(targetIndex, 1);
  res.status(200).send(taskList);
});

module.exports = router;
