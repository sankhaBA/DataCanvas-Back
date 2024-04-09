const express = require('express');
const router = express.Router();
const WidgetController = require('../controllers/widgetController');

/*
    * GET request for /api/widget?project_id=1
    * Returns all widgets for a project
*/
router.get('/', (req, res) => {
    const project_id = req.query.project_id;
});

/*
    * GET request for /api/widget/:widgetId
    * Returns a widget by id
*/
router.get('/:widget_id', (req, res) => {
    const widget_id = req.params.widget_id;
});

/*
    * POST request for /api/widget
    * Creates a new widget
*/
router.post('/', (req, res) => {
    const widget = req.body;
    try {
        WidgetController.createWidget(req, res);
    } catch (err) {
        console.log(err);
    }
});

/*
    * PUT request for /api/widget/:widgetId
    * Updates a widget by id
*/
router.put('/', (req, res) => {

});

/*
    * DELETE request for /api/widget/:widgetId
    * Deletes a widget by id
*/
router.delete('/', (req, res) => {

});

module.exports = router;