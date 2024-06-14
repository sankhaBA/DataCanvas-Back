DROP TRIGGER IF EXISTS after_delete_toggle ON "iot-on-earth-public".toggles;


DROP TRIGGER IF EXISTS after_delete_gauge ON "iot-on-earth-public".gauges;


DROP TRIGGER IF EXISTS after_delete_chart ON "iot-on-earth-public".charts;


DROP TRIGGER IF EXISTS after_delete_chartseries ON "iot-on-earth-public".chartseries;


DROP TRIGGER IF EXISTS after_delete_parametertable_column ON "iot-on-earth-public".parametertables;


DROP FUNCTION IF EXISTS "iot-on-earth-public".delete_from_widget() CASCADE;


DROP FUNCTION IF EXISTS "iot-on-earth-public".check_and_delete_chart() CASCADE;


DROP FUNCTION IF EXISTS "iot-on-earth-public".check_and_delete_widget() CASCADE;