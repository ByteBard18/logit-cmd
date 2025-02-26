import fs from "fs/promises";
import path from "path";

export async function addLog(logDir, logEntry) {
    const logText = `
      ID: ${logEntry._id}
      Timestamp: ${logEntry.timestamp}
      Log-Level: ${logEntry.level}
      Command: ${logEntry.command}
      Status-Code: ${logEntry.statusCode}
      Directory: ${logEntry.directory}
      Filename: ${logEntry.filename}
      Output: ${logEntry.output}
      Error: ${logEntry.error}
      Cause: ${logEntry.cause}
      Stack-Trace: ${logEntry.stackTrace}
      
      ----------------------------------------
      `;
    
    // Path to the log file
    const logFilePath = path.join(logDir, "audit.log");
    
    // Append the log entry to the log file
    await fs.appendFile(logFilePath, logText);
}

//more functionalities very soon...
