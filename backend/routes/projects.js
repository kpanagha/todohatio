const express = require('express');
const Project = require('../models/Project');
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const axios = require('axios');

// Create a new project
router.post('/', async (req, res) => {  // Corrected path
  try {
    const project = new Project({ title: req.body.title, userId: req.user });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ msg: 'Error creating project', error });
  }
});

// List all projects for a user
router.get('/', async (req, res) => {
  try {
    console.log('Authenticated user ID:', req.user); // Log user ID for debugging

    // Fetch projects where the userId matches the logged-in user's ID
    const projects = await Project.find({ userId: req.user });

    console.log('Projects found:', projects); // Log projects returned from database

    // Check if any projects were found
    if (projects.length === 0) {
      return res.status(404).json({ msg: 'No projects found for this user' });
    }

    res.status(200).json(projects); // Return the projects
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching projects', error });
  }
});


// View a single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('todos');
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching project', error });
  }
});

// Edit a project
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ msg: 'Error updating project', error });
  }
});

// Delete a project
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(200).json({ msg: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting project', error });
  }
});

// Export project as gist
router.post('/:id/export', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('todos');
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
  
    // Create Markdown format
    const pendingTasks = project.todos.filter(todo => todo.status === false) // Filtering pending tasks
      .map(todo => `- [ ] ${todo.description}`);
    const completedTasks = project.todos.filter(todo => todo.status === true) // Filtering completed tasks
      .map(todo => `- [x] ${todo.description}`);
  
    const gistContent = `# ${project.title}\n\n` +
      `## Summary: ${completedTasks.length} / ${project.todos.length} completed\n\n` +
      `### Pending Tasks\n${pendingTasks.join('\n')}\n\n` +
      `### Completed Tasks\n${completedTasks.join('\n')}`;

    // Prepare the Gist data
    const gistData = {
      description: `Project: ${project.title}`,
      public: false, // Secret Gist
      files: {
        [`${project.title.replace(/\s+/g, '_')}.md`]: {
          content: gistContent,
        },
      },
    };
    
    // Make the API request to GitHub Gist API
    const response = await axios.post('https://api.github.com/gists', gistData, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,  // Authorization using GitHub token
        'Content-Type': 'application/json',
      },
    });

    res.json({ msg: 'Gist exported successfully!', gistUrl: response.data.html_url });
  } catch (error) {
    console.error('Error exporting gist:', error);
    res.status(500).json({ msg: 'Error exporting gist', error });
  }
});

module.exports = router;
