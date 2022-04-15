import { cleanEnv } from "envalid";
import { config } from "dotenv";

config();

export const env = cleanEnv(process.env, {});
