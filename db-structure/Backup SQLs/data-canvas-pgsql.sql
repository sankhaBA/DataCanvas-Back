/* -- Drop schema if exists
DROP SCHEMA IF EXISTS platform CASCADE;

-- Create schema
CREATE SCHEMA platform; */

-- Set search path
SET search_path TO platform;

-- Table platform.user
CREATE TABLE IF NOT EXISTS user (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(45) NOT NULL,
  name VARCHAR(50) NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS email_unique_idx ON "user" (email);

-- Table platform.project
CREATE TABLE IF NOT EXISTS project (
  project_id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(100) NOT NULL,
  fingerprint VARCHAR(40) NOT NULL,
  "user" INT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT user_id_fk FOREIGN KEY ("user") REFERENCES "user" (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS project_id_unique_idx ON project (project_id);
CREATE INDEX IF NOT EXISTS user_id_idx ON project ("user");

-- Table platform.device
CREATE TABLE IF NOT EXISTS device (
  device_id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  fingerprint VARCHAR(40) NOT NULL,
  project INT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT project_id_fk FOREIGN KEY (project) REFERENCES project (project_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS device_id_unique_idx ON device (device_id);
CREATE INDEX IF NOT EXISTS project_id_fk_idx ON device (project);

-- Table platform.data_table
CREATE TABLE IF NOT EXISTS data_table (
  table_id SERIAL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  project INT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT project_id_fk_data_table FOREIGN KEY (project) REFERENCES project (project_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS table_id_unique_idx ON data_table (table_id);
CREATE INDEX IF NOT EXISTS project_id_fk_data_table_idx ON data_table (project);

-- Table platform.data_type
CREATE TABLE IF NOT EXISTS data_type (
  datatype_id SERIAL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS datatype_id_unique_idx ON data_type (datatype_id);

-- Table platform.column
CREATE TABLE IF NOT EXISTS column_data (
  column_id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  data_type INT NOT NULL,
  "table" INT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT table_id_fk_column FOREIGN KEY ("table") REFERENCES data_table (table_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT data_type_id_fk_column FOREIGN KEY (data_type) REFERENCES data_type (datatype_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS column_id_unique_idx ON column_data (column_id);
CREATE INDEX IF NOT EXISTS table_id_fk_column_idx ON column_data ("table");
CREATE INDEX IF NOT EXISTS data_type_id_fk_column_idx ON column_data (data_type);

-- Table platform.constraint
CREATE TABLE IF NOT EXISTS constraint_data (
  constraint_id INT PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP
);

-- Table platform.constraint_column
CREATE TABLE IF NOT EXISTS constraint_column (
  id SERIAL PRIMARY KEY,
  column INT NOT NULL,
  constraint INT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT column_id_fk_constraint_column FOREIGN KEY (column) REFERENCES column_data (column_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT constraint_id_fk_constraint_column FOREIGN KEY (constraint) REFERENCES constraint_data (constraint_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS id_unique_idx ON constraint_column (id);
CREATE INDEX IF NOT EXISTS column_id_fk_constraint_column_idx ON constraint_column (column);
CREATE INDEX IF NOT EXISTS constraint_id_fk_constraint_column_idx ON constraint_column (constraint);

-- Table platform.widget
CREATE TABLE IF NOT EXISTS widget (
  widget_id SERIAL PRIMARY KEY,
  dataset INT NOT NULL,
  type VARCHAR(25) NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT dataset_id_fk_widget FOREIGN KEY (dataset) REFERENCES data_table (table_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS widget_id_unique_idx ON widget (widget_id);
CREATE INDEX IF NOT EXISTS dataset_id_fk_widget_idx ON widget (dataset);

-- Table platform.variation
CREATE TABLE IF NOT EXISTS variation (
  id SERIAL PRIMARY KEY,
  widget_id INT NOT NULL,
  x_parameter INT NOT NULL,
  type INT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT widget_id_fk_variation FOREIGN KEY (widget_id) REFERENCES widget (widget_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT x_param_id_fk_variation FOREIGN KEY (x_parameter) REFERENCES column_data (column_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS id_unique_idx_variation ON variation (id);
CREATE INDEX IF NOT EXISTS x_param_id_fk_variation_idx ON variation (x_parameter);

-- Table platform.y_parameter
CREATE TABLE IF NOT EXISTS y_parameter (
  id SERIAL PRIMARY KEY,
  variation_id INT NOT NULL,
  column INT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT variation_id_fk_y_parameter FOREIGN KEY (variation_id) REFERENCES variation (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT column_id_fk_y_parameter FOREIGN KEY (column) REFERENCES column_data (column_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS id_unique_idx_y_parameter ON y_parameter (id);
CREATE INDEX IF NOT EXISTS variation_id_fk_y_parameter_idx ON y_parameter (variation_id);
CREATE INDEX IF NOT EXISTS column_id_fk_y_parameter_idx ON y_parameter (column);

-- Table platform.stack_parameters
CREATE TABLE IF NOT EXISTS stack_parameters (
  id SERIAL PRIMARY KEY,
  widget_id INT NOT NULL,
  column INT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT widget_id_fk_stack_parameters FOREIGN KEY (widget_id) REFERENCES widget (widget_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT column_id_fk_stack_parameters FOREIGN KEY (column) REFERENCES column_data (column_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS id_unique_idx_stack_parameters ON stack_parameters (id);
CREATE INDEX IF NOT EXISTS widget_id_fk_stack_parameters_idx ON stack_parameters (widget_id);
CREATE INDEX IF NOT EXISTS column_id_fk_stack_parameters_idx ON stack_parameters (column);

-- Table platform.toggle
CREATE TABLE IF NOT EXISTS toggle (
  id SERIAL PRIMARY KEY,
  widget_id INT NOT NULL,
  parameter INT NOT NULL,
  write_enabled SMALLINT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT widget_id_fk_toggle FOREIGN KEY (widget_id) REFERENCES widget (widget_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT parameter_id_fk_toggle FOREIGN KEY (parameter) REFERENCES column_data (column_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS id_unique_idx_toggle ON toggle (id);
CREATE INDEX IF NOT EXISTS widget_id_fk_toggle_idx ON toggle (widget_id);
CREATE INDEX IF NOT EXISTS parameter_id_fk_toggle_idx ON toggle (parameter);

-- Table platform.gauge
CREATE TABLE IF NOT EXISTS gauge (
  id VARCHAR(45) PRIMARY KEY,
  widget_id INT NOT NULL,
  parameter INT NOT NULL,
  max DOUBLE PRECISION NOT NULL,
  type INT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  CONSTRAINT widget_id_fk_gauge FOREIGN KEY (widget_id) REFERENCES widget (widget_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT parameter_id_fk_gauge FOREIGN KEY (parameter) REFERENCES column_data (column_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS id_unique_idx_gauge ON gauge (id);
CREATE INDEX IF NOT EXISTS widget_id_fk_gauge_idx ON gauge (widget_id);
CREATE INDEX IF NOT EXISTS parameter_id_fk_gauge_idx ON gauge (parameter);
