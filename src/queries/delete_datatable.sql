/*
    * THIS FUNCTION IS TRIGGERED WHEN A ROW FROM datatables TABLE IS DELETED
    * IT WILL DELETE THE DYNAMICALLY CREATED TABLE
    * THE DYNAMICALLY CREATED TABLE NAME WILL BE 'iot-on-earth-public.datatable_' + OLD.tbl_id
*/
CREATE OR REPLACE FUNCTION "iot-on-earth-public".delete_datatable() RETURNS TRIGGER AS $$
DECLARE
    tbl_name TEXT;
BEGIN
    -- Construct the table name dynamically
    tbl_name := 'datatable_' || OLD.tbl_id;

    -- Drop the dynamically constructed table
    EXECUTE 'DROP TABLE IF EXISTS "iot-on-earth-public".' || tbl_name;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;