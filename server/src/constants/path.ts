import { join } from "node:path";

export const CONFIG_PATH = join(globalThis.PROJECT_ROOT_DIR, "config");
export const GLOBAL_CONFIG_PATH = join(
  globalThis.PROJECT_ROOT_DIR,
  "..",
  "settings.json"
);
