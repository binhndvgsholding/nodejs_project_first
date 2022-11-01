module.exports = {
    up: "ALTER TABLE messages ADD COLUMN image varchar(300)  null",
    down: "ALTER TABLE messages  DROP COLUMN image",
}