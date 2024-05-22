/*
    * THIS TRIGGER IS TO DELETE DYNAMICALLY CREATED RELATION RELATED TO THE DELETING DATA TABLE FROM datatables TABLE
*/
CREATE OR REPLACE TRIGGER after_delete_datatable AFTER
DELETE ON "iot-on-earth-public".datatables
FOR EACH ROW EXECUTE FUNCTION "iot-on-earth-public".delete_datatable();