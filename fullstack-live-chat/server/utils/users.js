const users = [];

function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

function getRoomUsers(room) {
  return users.filter((u) => u.room === room);
}

function userLeave(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getCurrentUser(userId) {
  return users.find((u) => u.id == userId);
}

module.exports = {
  userJoin,
  getRoomUsers,
  userLeave,
  getCurrentUser,
};
