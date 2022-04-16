import path from "path";
import execa from "execa";
import fs from "fs-extra";

const PROJECT_DIR = path.join(__dirname, "..");
const PROTOS_DIR = path.join(PROJECT_DIR, "protos");
const OUT_DIR = path.join(PROJECT_DIR, "lib");

const toRelative = (p: string) => path.relative(process.cwd(), p);

// https://github.com/timostamm/protobuf-ts
const args = [
  `--ts_out=${toRelative(OUT_DIR)}`,
  `--proto_path=${toRelative(PROTOS_DIR)}`,
  `--ts_opt=output_javascript`,
  `--ts_opt=server_grpc1`,
];

export const run = async () => {
  await fs.remove(OUT_DIR);

  await fs.ensureDir(OUT_DIR);

  const filenames = await fs.readdir(PROTOS_DIR);

  await execa("npx", [
    "protoc",
    ...args,
    filenames
      .map((n) => path.join(PROTOS_DIR, n))
      .map(toRelative)
      .join(" "),
  ]);
};

run();
