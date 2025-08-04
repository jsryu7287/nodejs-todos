create database tododb DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Drop tables if they exist to prevent errors on re-creation
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create the todos table
CREATE TABLE todos (
    todo_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Insert sample data
-- Note: Passwords are in plaintext as requested.

-- Insert admin user
INSERT INTO users (email, user_name, password) VALUES ('admin@example.com', 'Admin User', 'adminpass');

-- Insert regular users
INSERT INTO users (email, user_name, password) VALUES ('user1@example.com', 'Test User One', 'password');
INSERT INTO users (email, user_name, password) VALUES ('user2@example.com', 'Test User Two', 'password');

-- Insert todos for user1@example.com (user_id = 2)
INSERT INTO todos (user_id, title) VALUES (2, 'Buy groceries');
INSERT INTO todos (user_id, title, is_completed) VALUES (2, 'Finish project report', TRUE);
INSERT INTO todos (user_id, title) VALUES (2, 'Call the bank');

-- Insert todos for user2@example.com (user_id = 3)
INSERT INTO todos (user_id, title) VALUES (3, 'Schedule dentist appointment');
INSERT INTO todos (user_id, title) VALUES (3, 'Pay electricity bill');


## 권한 부여
CREATE USER 'todouser'@'X.X.X.X' IDENTIFIED BY '비밀번호';
GRANT ALL PRIVILEGES ON *.* TO 'todouser'@'X.X.X.X' WITH GRANT OPTION;
FLUSH PRIVILEGES;
