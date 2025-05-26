const fs = require("fs");
const path = require("path");

const filePath =
  "C:\\Users\\Ayush\\.android\\avd\\Pixel_9_Pro.avd\\emulator-user.ini";

const newContent = `window.x = 0
window.y = 0
window.scale = 0.27
resizable.config.id = -1
posture = 0
uuid = 1748027102618
`;
// Read the file
const fileContent = fs.readFileSync(filePath, "utf8");

//Replace the file with the new content
fs.writeFileSync(filePath, newContent);

console.log("File updated successfully");

console.log(fs.readFileSync(filePath, "utf8"));
