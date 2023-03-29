/*###########################*/
/*######## users ############*/
/*###########################*/
CREATE TABLE IF NOT EXISTS dim_companies(
  company_id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS dim_users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('maintainance', 'manager', 'administrator')),
  company_id INTEGER NOT NULL REFERENCES dim_companies(company_id)
);

/*make sure each company can have unique user names
 but every company can the same user name of diffrent cmpanies*/
CREATE UNIQUE INDEX idx_dim_users_company_user ON dim_users (company_id, user_name);

INSERT INTO dim_companies (company_name)
VALUES ('Acme Corporation');

INSERT INTO dim_companies (company_name)
VALUES ('HIT');

INSERT INTO dim_users 
(user_name, first_name, last_name, email, password, phone, role, company_id) VALUES
 ('tempAdmin', 'John', 'Doe', 'johndoeACME@example.com', 'Password1', '555-1234', 'administrator', 1),
 ('tempAdmin', 'John', 'Doe', 'johndoeHIT@example.com', 'Password1', '555-1234', 'administrator', 2);

/*###########################*/
/*######## guides ###########*/
/*###########################*/
CREATE TABLE IF NOT EXISTS fact_guides (
  guide_id SERIAL PRIMARY KEY,
  guide_title VARCHAR(255) NOT NULL,
  guide_content TEXT NOT NULL,
  company_id INTEGER NOT NULL REFERENCES public.dim_companies(company_id)
);