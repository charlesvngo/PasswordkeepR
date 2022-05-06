-- Drop and recreate passwords table
DROP TABLE IF EXISTS passwords CASCADE;

CREATE TABLE passwords (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  website_url VARCHAR(255) NOT NULL,
  category VARCHAR(255)
);
