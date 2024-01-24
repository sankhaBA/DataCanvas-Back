const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');

// GET request for /api/project or /api/project?user_id=sample_user_id
router.get('/', (req, res) => {
    const user_id = req.query.user_id;

    try {
        if (user_id) {  // if user_id parameter is available, send project details related to that user_id
            ProjectController.getProjectsByUserId(user_id, res);
        } else {  // If user_id parameter is not available, send all projects
            console.log("no user_id");
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting projects:', error);
        res.status(500).json({ error: 'Failed to get projects' });
    }

});

// GET request for /api/project/:projectId
router.get('/:projectId', (req, res) => {
    const projectId = req.params.projectId;

    try {
        if (projectId) {  // if projectId parameter is available, send project details related to that projectId
            ProjectController.getProjectById(projectId, res);
        } else {  // If projectId parameter is not available, send all projects
            console.log("no projectId");
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting projects:', error);
        res.status(500).json({ error: 'Failed to get projects' });
    }

});

// POST request for /api/project, and create a new project
router.post('/', (req, res) => {
    try {
        if (!req.body.project_name || !req.body.user_id) {
            res.status(400).json({ message: 'Bad Request' });
        } else {
            ProjectController.addProject(req, res);
        }
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Failed to add project' });
    }
});

// PUT request for /api/project/:projectId, and update the project with the required projectId
router.put('/', (req, res) => {
    const { project_name, project_id } = req.body;

    try {
        if (project_id && project_name && project_name != "") {  // if projectId parameter is available
            ProjectController.updateProjectById(req, res);
        } else { // if projectId parameter is not available
            console.log("no projectId");
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// DELETE request for /api/project/, and delete the project with the required projectId
router.delete('/', (req, res) => {
    const project_id = req.body.project_id;

    try {
        if (project_id) {  // if projectId parameter is available, send project details related to that projectId
            ProjectController.deleteProjectById(project_id, res);
        } else {
            console.log("no projectId");
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }

});

module.exports = router;
