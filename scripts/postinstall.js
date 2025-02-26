import { exec } from "child_process";
import fs from "fs/promises"

const presentDir = process.cwd()
const root_dir = presentDir.split("/").slice(0, -3).join("/");

await fs.open("../../../audit.log", "w+");

exec(`touch ${root_dir}/constant.js && echo "export const root_dir = '${root_dir}'" > ${root_dir}/constant.js`, (err, stdout, stderr) => {
    if (err) {
        console.error("Error creating constant.js file:", err);
    } else {
        console.log("constant.js file created successfully.");
    }
});

