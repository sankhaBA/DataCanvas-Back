const Project = require('../models/projectModel');
const User = require('../models/userModel');
const DataTable = require('../models/dataTableModel');
const sequelize = require("./../../db");
require('dotenv').config();

async function getProjectsByUserId(user_id, res) {
    try {
        // Check if user exists
        let user = await User.findOne({ where: { user_id } });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        let projects = await Project.findAll({ where: { user_id } });

        res.status(200).json(projects);

    } catch (error) {
        console.error('Error getting projects by user_id:', error);
        res.status(500).json({ error: 'Failed to get projects by user' });
    }
}

async function getProjectById(project_id, res) {
    try {
        let project = await Project.findOne({ where: { project_id } });

        if (project) {
            res.status(200).json(project);
        }
        else {
            res.status(404).json({ message: "Project not found" });
        }


    } catch (error) {
        console.error('Error getting project by id:', error);
        res.statu(500).json({ error: 'Failed to get project by id' })
    }
}


async function addProject(req, res) {
    const { project_name, user_id, description } = req.body;

    // Check user_id available using User Model
    try {
        let user = await User.findOne({ where: { user_id } });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
    } catch (error) {
        console.error('Error checking user_id:', error);
        res.status(500).json({ error: 'Failed to check user ID' });
        return;
    }

    try {
        let project = await Project.create({ project_name, user_id, description });
        res.status(200).json(project);
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Failed to add project' });
    }
}

async function updateProjectById(req, res) {
    const { project_id, project_name, description } = req.body;

    try {
        let updatedRowCount = await Project.update({ project_name, description }, { where: { project_id } });

        if (updatedRowCount > 0) {
            res.status(200).json({ message: "Project updated successfully" });
        } else {
            res.status(404).json({ message: "Project not found" });
        }

    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
}

async function deleteProjectById(project_id, res) {
    try {
        await sequelize.transaction(async (t) => {
            const deletedRowCount = await Project.destroy({ where: { project_id }, transaction: t });

            if (deletedRowCount > 0) {
                res.status(200).json({ message: "Project deleted successfully" });
            }
            else {
                res.status(404).json({ message: "Project not found" });
            }
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
}

module.exports = {
    getProjectsByUserId,
    getProjectById,
    addProject,
    updateProjectById,
    deleteProjectById,
};