-- Create employees table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    IF NOT EXISTS employees (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        position VARCHAR(100) NOT NULL,
        department VARCHAR(100),
        salary DECIMAL(12, 2),
        hire_date TIMESTAMP DEFAULT NOW (),
        is_active BOOLEAN DEFAULT true,
        team_id UUID,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

-- Create teams table
CREATE TABLE
    IF NOT EXISTS teams (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name VARCHAR(100) NOT NULL,
        description TEXT,
        leader_id UUID,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

-- Create departments table
CREATE TABLE
    IF NOT EXISTS departments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        budget DECIMAL(15, 2),
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

-- Add foreign key constraints
ALTER TABLE employees ADD CONSTRAINT fk_employee_team FOREIGN KEY (team_id) REFERENCES teams (id) ON DELETE SET NULL;

ALTER TABLE teams ADD CONSTRAINT fk_team_leader FOREIGN KEY (leader_id) REFERENCES employees (id) ON DELETE SET NULL;

-- Create indexes for better query performance
CREATE INDEX idx_employees_email ON employees (email);

CREATE INDEX idx_employees_team_id ON employees (team_id);

CREATE INDEX idx_employees_department ON employees (department);

CREATE INDEX idx_employees_is_active ON employees (is_active);

CREATE INDEX idx_teams_name ON teams (name);

CREATE INDEX idx_departments_name ON departments (name);