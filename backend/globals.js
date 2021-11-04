let rooms = [];

module.exports = {
  getRooms: async () => {
    return rooms;
  },
  addRoom: async (room) => {
    rooms.push(room);
  },
};
