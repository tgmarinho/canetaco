import { createHash } from "node:crypto";

export function sha256(input: Buffer | string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function sha256Stream(chunks: AsyncIterable<Uint8Array>): Promise<string> {
  return (async () => {
    const hash = createHash("sha256");
    for await (const chunk of chunks) hash.update(chunk);
    return hash.digest("hex");
  })();
}
