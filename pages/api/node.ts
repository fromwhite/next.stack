import type { NextApiRequest, NextApiResponse } from "next";
import crypto from 'crypto';

interface Data {
  runtime: "Node";
  message: string;
  time: string;
  pi: number;
}

function createRandom(seed: number) {
  const getRandomInt = (min: number, max: number) => {
    const range = max - min + 1;
    const bytes = crypto.randomBytes(4);
    const value = bytes.readUInt32LE(0);
    return min + (value % range);
  };

  return {
    int: getRandomInt
  };
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
): void {
  const t0 = performance.now();

  const seed = Math.floor(Date.now() / 1000);
  const random = createRandom(seed);

  const radius = 424242;
  const loops = 1_000_000;
  let counter = 0;

  for (let i = 0; i < loops; i++) {
    const x = random.int(1, radius);
    const y = random.int(1, radius);

    if (Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(radius, 2)) {
      counter++;
    }
  }
  const pi = (4.0 * counter) / loops;

  const t1 = performance.now();

  res.status(200).json({
    runtime: "Node",
    message: `${counter} / ${loops}`,
    time: `${(t1 - t0).toFixed(2)} milliseconds`,
    pi,
  });
}
