import type { NextApiRequest, NextApiResponse } from "next";
import crypto from 'crypto';

interface Data {
  runtime: "Node";
  message: string;
  time: string;
  pi: number;
}

interface ErrorResponse {
  error: string;
}

function createRandom() {
  const buffer = Buffer.alloc(4);
  
  const getRandomInt = (min: number, max: number) => {
    try {
      const range = max - min + 1;
      crypto.randomFillSync(buffer);
      const value = buffer.readUInt32LE(0);
      return min + (value % range);
    } catch (err) {
      console.error('Random generation error:', err);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  return { int: getRandomInt };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
): void {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const t0 = performance.now();
    const random = createRandom();

    const radius = 424242;
    const radiusSquared = radius * radius;
    const loops = 1_000_000;
    let counter = 0;

    for (let i = 0; i < loops; i++) {
      const x = random.int(1, radius);
      const y = random.int(1, radius);
      
      if (x * x + y * y < radiusSquared) {
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
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      error: 'Internal calculation error' 
    });
  }
}
