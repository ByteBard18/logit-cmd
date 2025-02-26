import chalk from "chalk";

class Output extends Error {
    constructor(directory, filename, command, level, statusCode, output, error, cause, stackTrace) {
        super(error || "No error message provided");

        this._id = Math.random().toString(36).slice(2);  // Generates a unique ID for this log
        this.timestamp = new Date().toISOString();
        this.directory = directory;
        this.filename = filename;
        this.command = command;
        this.level = level || "info";  // Default to 'info' level
        this.statusCode = statusCode || 0; // Default to 0 (success)

        this.output = output || null;
        this.error = error || null;
        this.cause = cause || null;

        // Stack trace
        if (stackTrace) {
            this.stackTrace = stackTrace;
        } else {
            Error.captureStackTrace(this);
        }
    }

    // Override toString to provide a better formatted output
    toString() {
        return `[${this.timestamp}] [${this.level}] [${this.command}] - [${this.statusCode}] \n` +
            `[Directory]: ${this.directory} \n` +
            `[Filename]: ${this.filename} \n` +
            `[Output]: ${this.output} \n` +
            `[Error]: ${this.error || "No error"} \n` +
            `[Cause]: ${this.cause || "N/A"} \n` +
            `[StackTrace]: ${this.stackTrace || "No stack trace available"}`;
    }

    // Log method to output logs depending on the log level
    log() {
        // You can customize log level handling here
        switch (this.level.toLowerCase()) {
            case 'error':
                // Red color with bold and background red for error messages
                console.error(chalk.bold.bgRed.white(this.toString()));
                break;
            case 'warn':
                // Yellow color with bold for warning messages
                console.warn(chalk.bold.yellow(this.toString()));
                break;
            case 'info':
            default:
                // Green color for info messages (you can change this color as you prefer)
                console.log(chalk.green(this.toString()));
                break;
        }
    }

    // Serialize the object for storing/sending
    serialize() {
        const serializedData = {
            timestamp: this.timestamp,
            directory: this.directory,
            filename: this.filename,
            command: this.command,
            level: this.level,
            statusCode: this.statusCode,
            output: this.output,
            error: this.error ? this.error.message : null,
            cause: this.cause || null,
            stackTrace: this.stackTrace || null
        };

        // Handle circular references or non-serializable data in the error object
        try {
            return JSON.stringify(serializedData);
        } catch (err) {
            console.error('Error serializing Output object:', err);
            return null;
        }
    }
}

export { Output };
