

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Project = require('../models/Project');
const Todo = require('../models/Todo');
const router = express.Router();

// Add a new todo to a project
router.post('/addtodo/:projectId',  async (req, res) => {
  console.log("Project ID from URL:", req.params.projectId);
  try {
    
    const project = await Project.findById(req.params.projectId);
    console.log(project);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const todo = new Todo({
      description: req.body.description,
      status: Boolean(req.body.status),
       projectId: req.params.projectId
    });
    await todo.save();
    await Project.findByIdAndUpdate(req.params.projectId, { $push: { todos: todo._id } });
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);

    res.status(500).json({ msg: 'Error creating todo', error });
  }
});


// Update a todo
router.put('/updatetodo/:id',  async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ msg: 'Error updating todo', error });
  }
});

// Delete a todo
router.delete('/deletetodo/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    // Find the todo to get its associated projectId
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    // Remove the todo from the database
    await Todo.findByIdAndDelete(todoId);

    // Remove the todo reference from the project's todos array
    await Project.updateOne(
      { _id: todo.projectId }, // Find the project containing the todo
      { $pull: { todos: todoId } } // Remove the todo from the array
    );

    res.json({ msg: 'Todo deleted and removed from project' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ msg: 'Error deleting todo', error });
  }
});

module.exports = router;
