import { DataSource } from "typeorm";
import { ConfigManager } from "../../config";
import { join } from "node:path";
import UTILS from "../../utils";
import CONSTANTS from "../../constants";

const AppDataSource = new DataSource({
  type: UTILS.TYPE_CHECKS.assertValidTypeormDatabaseTypes(
    ConfigManager.get("database:typeorm:type")
  ),
  host: UTILS.TYPE_CHECKS.assertString(
    ConfigManager.get("database:typeorm:host")
  ),
  port: UTILS.TYPE_CHECKS.assertNumber(
    ConfigManager.get("database:typeorm:port")
  ),
  username: UTILS.TYPE_CHECKS.assertString(
    ConfigManager.get("database:typeorm:username")
  ),
  password: UTILS.TYPE_CHECKS.assertString(
    ConfigManager.get("database:typeorm:password")
  ),
  synchronize: UTILS.TYPE_CHECKS.assertBoolean(
    ConfigManager.get("database:typeorm:synchronize")
  ),
  logging: UTILS.TYPE_CHECKS.assertBoolean(
    ConfigManager.get("database:typeorm:logging")
  ),
  entities: [join(CONSTANTS.PATH.TYPEORM_ENTITIES_PATH, "*.{ts,js}")],
});

export default AppDataSource;
