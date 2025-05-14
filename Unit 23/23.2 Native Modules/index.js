const fs = require("fs");

fs.writeFile("message.txt", "Hey Node!", (err) => {
    if (err){ throw err;}
    console.log("file saved");
});


fs.readFile("message.txt", "utf-8", (err, data) => {
    if (err) { throw err; }
    console.log("the file has this saved: " + data);
});