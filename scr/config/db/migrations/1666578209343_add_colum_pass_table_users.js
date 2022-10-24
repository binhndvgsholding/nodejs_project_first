module.exports = {
    up: "ALTER TABLE users ADD COLUMN pass varchar(50)",
    down: "ALTER TABLE users  DROP COLUMN pass",
}