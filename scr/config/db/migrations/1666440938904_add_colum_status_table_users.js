module.exports = {
  up: "ALTER TABLE users ADD COLUMN status int DEFAULT 0",
  down: "ALTER TABLE users  DROP COLUMN status",
};
