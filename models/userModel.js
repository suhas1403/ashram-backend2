const bcrypt = require('bcryptjs');

const users = [
  { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 10) },
  { id: 2, username: 'user2', password: bcrypt.hashSync('password2', 10) },
  { id: 3, username: 'user3', password: bcrypt.hashSync('password3', 10) },
];

module.exports = {
  getUserByUsername: (username) => users.find((user) => user.username === username),
};
