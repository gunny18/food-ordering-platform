import { join } from "node:path";
// Load dot env
import dotenv from "dotenv";
dotenv.config({ path: join(globalThis.PROJECT_ROOT_DIR, "..", ".env") });

import nconf from "nconf";
import CONSTANTS from "../constants";
import { FileKeyPathType } from "../types";
import { readFile, writeFile, unlink } from "node:fs/promises";

export class ConfigManager {
  private static uniqueInstance: ConfigManager | null;

  private constructor() {}

  private loadEnvVars() {
    nconf.env({
      lowerCase: CONSTANTS.ENV.CONVERT_ENV_TO_LOWERCASE,
      parseValues: CONSTANTS.ENV.PARSE_ENV_VARS,
    });
  }

  private async mergeFileConfig(filePaths: FileKeyPathType[]) {
    const globalJsonData: Record<string, any> = {};
    const createGlobalConfigJsonFilePromise = filePaths.map(
      async (filePath) => {
        const rawJsonData = await readFile(filePath.path, "utf8");
        const jsonData = JSON.parse(rawJsonData);
        globalJsonData[filePath.key] = jsonData;
      }
    );
    await Promise.all(createGlobalConfigJsonFilePromise);
    await writeFile(
      CONSTANTS.PATH.GLOBAL_CONFIG_PATH,
      JSON.stringify(globalJsonData),
      "utf8"
    );
    nconf.file({ file: CONSTANTS.PATH.GLOBAL_CONFIG_PATH });
    await unlink(CONSTANTS.PATH.GLOBAL_CONFIG_PATH);
  }

  public static async loadConfig(filePaths: FileKeyPathType[]) {
    if (!ConfigManager.uniqueInstance) {
      ConfigManager.uniqueInstance = new ConfigManager();
    }
    ConfigManager.uniqueInstance.loadEnvVars();
    await ConfigManager.uniqueInstance.mergeFileConfig(filePaths);
  }

  public static get(key: string): unknown | null {
    const lowerCaseKey = key.toLowerCase();
    const value = nconf.get(lowerCaseKey);
    const properValue = value ?? null;
    return properValue;
  }
}

export function getConfigFilePathTypes(): FileKeyPathType[] {
  return [
    {
      key: "database",
      path: join(CONSTANTS.PATH.CONFIG_PATH, "database.json"),
    },
  ];
}
