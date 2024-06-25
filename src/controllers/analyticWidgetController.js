const Project = require("../models/projectModel");
const AnalyticWidget = require("../models/analyticWidgetModel");

async function getAllAnalyticWidgets(project, res) {
    try {
        const availableProject = await Project.findByPk(project);
        if (!availableProject) {
            res.status(404).json({ message: "Project not found" });
            return;
        }

        const widgets = await AnalyticWidget.findAll({
            where: {
                project: project,
            },
        });

        res.status(200).json(widgets);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function getAnalyticWidget(widget_id, res) {
    try {
        const widget = await AnalyticWidget.findByPk(widget_id);
        if (!widget) {
            res.status(404).json({ message: "Widget not found" });
            return;
        }

        res.status(200).json(widget);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function createAnalyticWidget(project, widget_name, widget_type, dataset, parameter, device, res) {
    try {
        const availableProject = await Project.findByPk(project);
        if (!availableProject) {
            res.status(404).json({ message: "Project not found" });
            return;
        }

        const widget = await AnalyticWidget.create({
            widget_name,
            widget_type,
            dataset,
            project,
            parameter,
            device,
            latest_value_timestamp: new Date(),
        });

        res.status(200).json(widget);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function updateAnalyticWidget(widget_id, widget_name, widget_type, dataset, project, parameter, device, res) {
    try {
        const widget = await AnalyticWidget.findByPk(widget_id);
        if (!widget) {
            res.status(404).json({ message: "Widget not found" });
            return;
        }

        // await widget.update({
        //     widget_name,
        //     widget_type,
        //     dataset,
        //     parameter,
        //     device,
        // });

        await AnalyticWidget.update({
            widget_name,
            widget_type,
            dataset,
            parameter,
            device,
        }, {
            where: {
                id: widget_id,
            },
        });

        res.status(200).json(widget);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function updateAnalyticWidgetValue(widget_id, latest_value, res) {
    try {
        const widget = await AnalyticWidget.findByPk(widget_id);
        if (!widget) {
            res.status(404).json({ message: "Widget not found" });
            return;
        }

        await widget.update({
            latest_value,
            latest_value_timestamp: new Date(),
        });

        res.status(200).json(widget);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}

async function deleteAnalyticWidget(widget_id, res) {
    try {
        const widget = await AnalyticWidget.findByPk(widget_id);
        if (!widget) {
            res.status(404).json({ message: "Widget not found" });
            return;
        }

        await widget.destroy();

        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getAllAnalyticWidgets,
    getAnalyticWidget,
    createAnalyticWidget,
    updateAnalyticWidget,
    updateAnalyticWidgetValue,
    deleteAnalyticWidget,
};

