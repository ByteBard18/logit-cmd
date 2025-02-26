# @advait_thakar/logit-cmd

## Overview
`@advait_thakar/logit-cmd` is a simple command-line logger for auditing and executing commands within your project directory. It enables structured logging of command executions, errors, and outputs, providing an efficient way to track terminal activity within a Node.js project.

## Features
- Execute shell commands within a custom CLI environment.
- Automatically logs executed commands, errors, and outputs.
- Supports execution in the root directory or a specified sub-directory.
- Provides structured log files for auditing.
- Supports real-time command execution.

---

## Installation
To install the package, use:
```sh
npm install @advait_thakar/logit-cmd
```
Upon installation, necessary log files and configurations will be generated.

---

## Setup
After installing the package, update your project's `package.json` by adding a script to run the Executor:

```json
"scripts": {
  "dev": "node ./node_modules/@advait_thakar/logit-cmd/lib/Executor.js"
}
```

Additionally, ensure your `package.json` has:
```json
"type": "module"
```
This avoids unnecessary warning spam in logs.

---

## Usage
To start the Executor, run:
```sh
npm run dev
```
This launches the CLI executor in the root directory of your project. You can then enter commands interactively.

### Command Execution
Inside the Executor, you can run shell commands with optional directory flags:
- **`-r` (default)**: Executes the command in the root directory of the project.
- **`-d <sub_directory>`**: Executes the command in a specified sub-directory.

#### Examples:
```sh
node main.js -r
```
Runs the command in the root directory.

```sh
node main.js -d example_sub_directory
```
Runs the command in `root/example_sub_directory`.

---

## Logging
Every command execution is logged with structured details, including:
- **Command executed**
- **Execution directory**
- **Status code**
- **Output and errors**

Logs are stored in:
```sh
root_directory/audit.log
```

Example log entry:
```
ID: abcd1234
Timestamp: 2025-02-26T12:34:56Z
Log-Level: info
Command: ls -la
Status-Code: 0
Directory: /path/to/project
Filename: commandExec.js
Output: total 12 ...
Error: No error
Cause: N/A
Stack-Trace: No stack trace available
----------------------------------------
```

---

## Project Structure
```
@advait_thakar/
  --logit-cmd/
      --lib/
          --Executor.js      # Command execution and CLI interface
          --Logger.js        # Log management and file writing
          --Output.js        # Log formatting and structured output
      --scripts/
         --postinstall.js    # Runs after package installation
      --index.js            # Exports commandExecutor
      --package.json        # Package metadata and dependencies
      --README.md           # Documentation
```

---

## API Documentation
### `Executor.js`
Handles command execution and logging.
```js
import { commandExecutor } from "./lib/Executor.js";
```

### `Logger.js`
Manages log file writing.
```js
import { addLog } from "./lib/Logger.js";
```

### `Output.js`
Formats and outputs log entries.
```js
import { Output } from "./lib/Output.js";
```

---

## Future Enhancements
- Adding more log management functionalities.
- Implementing a log retrieval CLI tool.
- Improving execution error handling.

---

## License
ISC License © 2025 advait_thakar

---

## Author
[advait_thakar](https://github.com/advait_thakar)

