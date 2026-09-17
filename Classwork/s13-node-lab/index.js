// index.js - Student Starter Skeleton
// TODO 1: Import built-in Node modules (os, fs/promises, path)
import os from "os";

// TODO 2: Import third-party NPM packages (chalk)
import chalk from "chalk";
import fs from 'fs-extra'
import path from 'node:path';


async function generateTelemetryReport() {
  console.log("Initializing Node.js Telemetry Engine...");

  try {
    // ==========================================
    // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
    // ==========================================
    // TODO: Get CPU architecture, platform, free memory (in MB), and system uptime (in hours)
    const platform = os.platform();
    const cpuInfo = os.cpus();
    const cpuModel = cpuInfo[0].model;
    const freeMemMB = (os.freemem() / (1024 * 1000)).toFixed(0);
    const usedMemMB = ((os.totalmem() - os.freemem())/(1024*1000)).toFixed(0);
    const uptimeHours = (os.uptime() / 3600).toFixed(2);

    // ==========================================
    // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
    // ==========================================
    // TODO: Print a colorful status report to the terminal using chalk colors
    console.log("==========================================");
    console.log("         SYSTEM & ENV TELEMETRY           ");
    console.log("==========================================");
    // Print Platform, Free Memory, and Uptime with custom colors
    console.log(`${chalk.bold("OS Platform:")}      ${chalk.yellow(platform)}`);
    console.log(`${chalk.bold("Cpu model:")}      ${chalk.bgCyan(cpuModel)}`);
    console.log(`${chalk.bold("Used Memory:")}      ${chalk.red(usedMemMB)}`);
    console.log(`${chalk.bold("Free Memory:")}      ${chalk.blue(freeMemMB)}`);
    console.log(`${chalk.bold("Uptime Hours:")}      ${chalk.green(uptimeHours)}`);


    // ==========================================
    // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
    // ==========================================
    const logEntry = `[${new Date().toISOString()}] PLATFORM: ${platform} | FREEMEM: ${freeMemMB}MB`;

    // TODO: Append logEntry to 'telemetry.log' using fs.appendFile()
    console.log("Writing log entry to disk...");
    const currentPath = ("./telemetry.log");

    const text = 
      "Os Platform: " + platform + "\n" + 
      "Cpu Model: " + cpuModel + "\n" +
      "Used Memory: " + usedMemMB + "\n" +
      "Free Memory: " + freeMemMB + "\n" +
      "Uptime Hours: " + uptimeHours + "\n";

    await fs.outputFile(currentPath, text);

    console.log("Telemetry audit completed successfully!");
  } catch (error) {
    console.error("Telemetry report generation failed:", error.message);
  }
}

// Execute engine
generateTelemetryReport();