import CONSTANTS from "../constants";
import { AllowedTypeormDatabaseType } from "../types";

export function assertString(val: unknown) {
  if (typeof val !== "string") throw new Error("Not a string type");
  return val;
}

export function assertNumber(val: unknown) {
  if (typeof val !== "number") throw new Error("Not a string type");
  return val;
}

export function assertBoolean(val: unknown) {
  if (typeof val !== "boolean") throw new Error("Not a string type");
  return val;
}

export function isValidTypeormDatabaseTypes(
  val: unknown
): val is AllowedTypeormDatabaseType {
  const databaseName = assertString(val);

  return (
    CONSTANTS.DATABASE.ALLOWED_TYPEORM_DATABASES.indexOf(databaseName) === -1
  );
}

export function assertValidTypeormDatabaseTypes(val: unknown) {
  if (!isValidTypeormDatabaseTypes(val))
    throw new Error("Invalid database type");
  return val;
}
