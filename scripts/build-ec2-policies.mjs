import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const directory = "src/examples/ec2-public-ip";
const temp = mkdtempSync(join(tmpdir(), "ec2-policies-"));
const bundle = join(temp, "bundle.tar.gz");
try {
  for (const name of ["old", "rewritten"]) {
    execFileSync(
      "opa",
      [
        "build",
        "-t",
        "wasm",
        "-e",
        "main/deny",
        "-o",
        bundle,
        `${directory}/${name}.rego`,
      ],
      { stdio: "inherit" },
    );
    const wasm = execFileSync("tar", ["-xOzf", bundle, "/policy.wasm"]);
    writeFileSync(`${directory}/${name}.wasm`, wasm);
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
