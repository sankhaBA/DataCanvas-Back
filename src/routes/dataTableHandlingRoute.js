const express = require('express');
const router = express.Router();
const DataTableHandlingController = require('../controllers/dataTableHandlingController');

router.post('/', (req, res) => {

    try {
        if (!req.body.tbl_name || !req.body.project_id) {
            res.status(400).json({ message: 'Bad Request' });
        } else {
            DataTableHandlingController.createTable(req, res);
        }
    } catch (error) {
        console.error('Error creating table:', error);
        res.status(500).json({ error: 'Failed to create table' });
    }
}
);

router.get('/', (req, res) => {
    const project_id = req.query.project_id;
    try {
        if (project_id) {
            DataTableHandlingController.getTablesByProjectId(project_id, res);
        }
        else {
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting tables:', error);
        res.status(500).json({ error: 'Failed to get tables' });
    }
}
);

router.get('/:tableId', (req, res) => {
    const tbl_id = req.params.tableId;
    try {
        if (tbl_id) {
            DataTableHandlingController.getTableById(tbl_id, res);
        }
        else {
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting table:', error);
        res.status(500).json({ error: 'Failed to get table' });
    }
}
);

router.put('/', (req, res) => {
    const { tbl_name, tbl_id } = req.body;
    try {
        if (tbl_id && tbl_name && tbl_name != "") {
            DataTableHandlingController.updateTable(req, res);
        }
        else {
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error updating table:', error);
        res.status(500).json({ error: 'Failed to update table' });
    }
});

router.post('truncate/:tbl_id', (req, res) => {
    const tbl_id = req.params.tbl_id;
    try {
        if (tbl_id) {
            DataTableHandlingController.truncateTable(tbl_id, res);
        } else {
            res.status(400).json({ message: 'Bad Request' });
        }
    }
    catch {
        console.error('Error truncating table', error);
        res.status(500).json({ error: 'Failed to truncate table' })
    }
});

router.delete('/', (req, res) => {
    const tbl_id = req.body.tbl_id;
    try {
        if (tbl_id) {
            DataTableHandlingController.deleteTable(tbl_id, res);
        }
        else {
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error deleting table:', error);
        res.status(500).json({ error: 'Failed to delete table' });
    }
});



module.exports = router;