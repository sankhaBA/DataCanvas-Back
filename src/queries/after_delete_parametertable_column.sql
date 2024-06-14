/*
    *  THIS TRIGGER WILL BE TRIGGERED WHEN A ROW FROM PARAMETERTABLES TABLE IS DELETED
    *  IT WILL DELETE THE WIDGET THAT CONTAINS THE WIDGET (ONLY IF THERE ARE NO MORE PARAMETERTABLE ROWS FOR THE WIDGET)
    *  THIS IS TO OVERCOME THE FOLLOWING ISSUE
        * WHEN A COLUMN IS DELETED FROM THE COLUMNS TABLE,
            * GAUGES
            * TOGGLES
            * RELEVANT ROWS FROM PARAMTER TABLES
            * RELEVANT ROWS FROM CHART SERIES TABLE
            * CHARTS
            WILL BE DELETED
        * WHEN ANY OF THE ABOVE DELETED, IT WILL MANIPULATE CREATED WIDGETS EXCEPT
            * WHEN THERE ARE MORE COLUMNS FOR PARAMETER TABLES
            * WHEN THERE ARE MORE CHART SERIES FOR CHARTS
        * SO, WHEN A TOGGLE OR GAUGE IS DELETED, THE WIDGET WILL BE DELETED AUTOMATICALLY
    *  BEFORE CREATING THIS TRIGGER, CREATE THE FUNCTION check_and_delete_widget
*/
CREATE OR REPLACE TRIGGER after_delete_parametertable_column AFTER
DELETE ON "iot-on-earth-public".parametertables
FOR EACH ROW EXECUTE FUNCTION "iot-on-earth-public".check_and_delete_widget();