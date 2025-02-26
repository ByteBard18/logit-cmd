import { exec } from "child_process";
import path, { dirname, join } from "path";
import { Output } from "./Output.js";  // Assuming Output is imported from the correct path
import { fileURLToPath } from "url";
import { addLog } from "./Logger.js";
import { createInterface } from "readline";

const root_dir = process.cwd();  // This will be your base directory

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`Executor started in the directory: ${root_dir}...`);
console.log("Welcome to the Executor. Type your commands, or type 'exit' to quit.");

rl.on("line", async (input) => {
    if (input.trim().toLowerCase() === "exit") {
        console.log("Exiting...");
        rl.close();
        return;
    }

    // Parse command-line arguments
    const { command, args, options } = parseCommandInput(input);

    // Execute the command with the parsed options
    await commandExecutor(command, args, options);
});

function parseCommandInput(input) {
    const inp = input.split(" ");
    let command = inp[0]; // First word is the command
    let args = inp.slice(1); // Rest are arguments
    let options = {}; // Options object to store flags

    // Check for flags and adjust the command arguments accordingly
    if (args.includes("-r")) {
        // If -r flag is found, set the target directory to the root directory (or default path)
        options.cwd = process.cwd(); // Root directory (current working directory)
        args = args.filter(arg => arg !== "-r"); // Remove the flag from args
    } else if (args.includes("-d")) {
        // If -d flag is found, set the target directory to the specified directory
        const directoryFlagIndex = args.indexOf("-d");
        if (directoryFlagIndex + 1 < args.length) {
            options.cwd = path.join(root_dir, args[directoryFlagIndex + 1]); // Set directory to next argument after -d
            args = args.filter((_, index) => index !== directoryFlagIndex && index !== directoryFlagIndex + 1); // Remove the flag and directory from args
        } else {
            console.error("Error: No directory specified after -d flag.");
            return { command: "", args: [], options: {} }; // Return early if no directory is specified
        }
    }

    return { command, args, options };
}

async function commandExecutor(command, args, options) {
    try {
        const targetDirectory = options.cwd || root_dir; // Use the target directory from options or fallback to root_dir

        const cmd = command + " " + args.join(" ");

        console.log(`Executing command in directory: ${targetDirectory}: ${cmd}`);

        // Execute the command
        exec(cmd, { cwd: targetDirectory }, (err, stdout, stderr) => {
            if (err) {
                const errorLog = new Output(
                    targetDirectory,
                    "commandExec.js",
                    cmd,
                    "error",
                    err.code || null,
                    stdout || null,
                    err,
                    stderr
                );
                errorLog.log();
                addLog(root_dir, errorLog)
                    .then(() => {
                        console.log("Error logged successfully.");
                    })
                    .catch((error) => {
                        console.error("Error logging error:", error);
                    });
            } else {
                const successLog = new Output(
                    targetDirectory,
                    "commandExec.js",
                    cmd,
                    "info",
                    0,  // Success status code
                    stdout,
                    null,
                    null
                );
                successLog.log();
                addLog(root_dir, successLog)
                    .then(() => {
                        console.log("Success logged successfully.");
                    })
                    .catch((error) => {
                        console.error("Error logging success:", error);
                    });
            }
        });

        // Log the directory in which the command is being executed
        const directoryLog = new Output(
            targetDirectory,
            "commandExec.js",
            cmd,
            "info",
            0,  // Success status code
            null,
            null,
            null
        );
        directoryLog.log();
        addLog(root_dir, directoryLog)
            .then(() => {
                console.log("Directory logged successfully.");
            })
            .catch((error) => {
                console.error("Error logging directory:", error);
            });

    } catch (error) {
        const loadingErrorLog = new Output(
            process.cwd(),
            "commandExec.js",
            "Module Loading",
            "error",
            null,  // No status code
            error.message,
            error,
            error.stack
        );
        loadingErrorLog.log();
        addLog(root_dir, loadingErrorLog)
            .then(() => {
                console.log("Error logged successfully.");
            })
            .catch((error) => {
                console.error("Error logging error:", error);
            });
        process.exit(1);
    }
}

export { commandExecutor };
