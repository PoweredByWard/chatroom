//requiring path and fs modules
const path = require("path");
const fs = require("fs");

eventList = [];

module.exports = {
  reloadEvents: async function () {
    //gets all events functions in folder
    await searchDir("");
    function searchDir(dir) {
      //joining path of directory
      const directoryPath = path.join(__dirname + dir);
      //passsing directoryPath and callback function
      fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        files.forEach((file) => {
          console.log(file)
          if (!file.includes(".")) searchDir(`${dir}/${file}`);
          if (file.includes(".js") && file != "index.js") {
            let event = require(`${__dirname}${dir}/${file}`);
            if (!eventList.includes(event)) {
              eventList.push(require(`${__dirname}${dir}/${file}`));
            }
          }
        });
      });
    }
  },
  connectSocket: async (socket) => {
    eventList.forEach((event) => {
      socket.on(event.name, async (props) => {
        console.log("name",event.name)
        console.log("props",props)
        await event.event(socket, props);
      });
    });
  },
};
