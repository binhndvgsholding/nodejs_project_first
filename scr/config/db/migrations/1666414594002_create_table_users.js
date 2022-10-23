module.exports = {
  up: "CREATE TABLE users  (id INT NOT NULL AUTO_INCREMENT, UNIQUE KEY id (id), name varchar(225) not null, email varchar(225) not null, img varchar(225) null, phone varchar(225) null, status int default(0) ,  PRIMARY KEY (id) )",
  down: "DROP TABLE users",
};
