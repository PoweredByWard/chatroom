class room {
  constructor(id, members, type) {
    this.id = id;
    this.members = members;
    this.maxSize = 2;
    this.public = false;
    this.created = new Date();
    let roomTypes = ["chat", "webcam"];
    console.log("type", type);
    if (roomTypes.includes(type)) {
      this.type = type;
    } else {
      this.type = "chat";
    }
  }
}

module.exports = room;
