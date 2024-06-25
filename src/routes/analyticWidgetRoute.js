const express = require('express');
const router = express.Router();
const AnalyticWidgetController = require('../controllers/analyticWidgetController');

/*
    * GET request for /api/analytic_widget?project=1
    * Returns all analytic widgets for a project
*/
router.get('/', (req, res) => {
    const project = req.query.project;
    try {
        if (!project) {
            res.status(400).json({ message: "Missing project" });
            return;
        } else {
            AnalyticWidgetController.getAllAnalyticWidgets(project, res);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get analytic widgets" });
    }
});

/*
    * GET request for /api/analytic_widget/:widgetId
    * Returns an analytic widget by id
*/
router.get('/:widget_id', (req, res) => {
    const widget_id = req.params.widget_id;

    try {
        if (widget_id == null) {
            res.status(400).json({ message: "Missing widget_id" });
            return;
        } else {
            AnalyticWidgetController.getAnalyticWidget(widget_id, res);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get analytic widget" });
    }
});

/*
    * POST request for /api/analytic_widget
    * Creates a new analytic widget
*/
router.post('/', (req, res) => {
    let { widget_name, widget_type, dataset, project, parameter, device } = req.body;

    if (widget_name == null || widget_type == null || dataset == null || project == null || parameter == null || device == null) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        AnalyticWidgetController.createAnalyticWidget(project, widget_name, widget_type, dataset, parameter, device, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create analytic widget" });
    }
});

/*
    * PUT request for /api/analytic_widget/:widget_id
    * Updates an existing analytic widget
*/

router.put('/value/', (req, res) => {
    let { widget_id, latest_value } = req.body;

    if (widget_id == null || latest_value == null) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        AnalyticWidgetController.updateAnalyticWidgetValue(widget_id, latest_value, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update analytic widget value" });
    }
});

router.put('/', (req, res) => {

    let { widget_id, widget_name, widget_type, dataset, project, parameter, device } = req.body;

    if (widget_name == null || widget_type == null || dataset == null || project == null || parameter == null || device == null) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        AnalyticWidgetController.updateAnalyticWidget(widget_id, widget_name, widget_type, dataset, project, parameter, device, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update analytic widget" });
    }
});

/*
    * DELETE request for /api/analytic_widget/:widget_id
    * Deletes an analytic widget by id
*/
router.delete('/:widget_id', (req, res) => {
    const widget_id = req.params.widget_id;

    try {
        if (widget_id == null) {
            res.status(400).json({ message: "Missing widget_id" });
            return;
        } else {
            AnalyticWidgetController.deleteAnalyticWidget(widget_id, res);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete analytic widget" });
    }
});

module.exports = router;
