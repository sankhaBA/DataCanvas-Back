ALTER TABLE "iot-on-earth-public".columnconstraint
DROP CONSTRAINT IF EXISTS columnconstraint_clm_id_fkey,
ADD CONSTRAINT columnconstraint_clm_id_fkey
FOREIGN KEY (clm_id) REFERENCES "iot-on-earth-public".columns(clm_id) ON DELETE CASCADE ON UPDATE CASCADE;
