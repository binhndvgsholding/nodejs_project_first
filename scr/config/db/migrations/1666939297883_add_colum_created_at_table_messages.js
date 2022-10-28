module.exports = {
    up: "ALTER TABLE messages ADD COLUMN created_at DATETIME",
    down: "ALTER TABLE messages  DROP COLUMN created_at",
}