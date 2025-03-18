declare global {
  var PROJECT_ROOT_DIR: string;
}

globalThis.PROJECT_ROOT_DIR = __dirname;

// Build the config manager vars
import { ConfigManager, getConfigFilePathTypes } from "./config";

async function init() {
  await ConfigManager.loadConfig(getConfigFilePathTypes());
  // All other entry imports
}

init()