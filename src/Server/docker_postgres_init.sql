CREATE TABLE public.dim_companies(
company_id SERIAL PRIMARY KEY,
company_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.dim_users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('maintainance', 'manager', 'administrator')),
  company_id INTEGER NOT NULL REFERENCES public.dim_companies(company_id)
);

INSERT INTO public.dim_companies (company_name)
VALUES ('Acme Corporation');

INSERT INTO public.dim_users (
    user_name,
    first_name,
    last_name,
    email,
    password,
    phone,
    role,
    company_id
) VALUES (
    'tempAdmin',
    'John',
    'Doe',
    'johndoe@example.com',
    'Password1',
    '555-1234',
    'administrator',
    1
);