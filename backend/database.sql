CREATE TABLE signup (
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE weather_searches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    weather_info TEXT,
    FOREIGN KEY (email) REFERENCES signup(email)
);
