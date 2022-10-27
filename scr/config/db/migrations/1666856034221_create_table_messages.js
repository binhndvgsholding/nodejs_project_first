module.exports = {
    up: "CREATE TABLE messages  (id INT NOT NULL AUTO_INCREMENT, UNIQUE KEY id (id), sender_id int not null, receiver_id int not null , content text ,  PRIMARY KEY (id) )",
    down: "DROP TABLE messages",
}