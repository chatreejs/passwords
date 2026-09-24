/**
 * A small rolling pool of entropy harvested from user input (mouse movement).
 *
 * This is NOT a cryptographic RNG on its own and is never used as one. It is
 * mixed into `crypto.getRandomValues` output via XOR (see `passwordGenerator`)
 * purely as defense-in-depth — XOR with an independent value is a bijection, so
 * the crypto source's uniform distribution is preserved and generation is never
 * weakened, even before any movement has been recorded (an all-zero pool is a
 * no-op XOR).
 */

/** Number of entropy bytes kept in the rolling pool. */
const POOL_SIZE = 512;

const pool = new Uint8Array(POOL_SIZE);
let writeCursor = 0;
let drawCursor = 0;

/** Fold a numeric value across four bytes of the rolling pool. */
export const mixEntropy = (value: number): void => {
  for (let i = 0; i < 4; i++) {
    const index = writeCursor % POOL_SIZE;
    pool[index] = (pool[index] + (value >>> (i * 8))) & 0xff;
    writeCursor = (writeCursor + 1) % POOL_SIZE;
  }
};

/** Draw four pool bytes as an unsigned 32-bit value, advancing the cursor. */
export const drawEntropy = (): number => {
  let value = 0;
  for (let i = 0; i < 4; i++) {
    const index = drawCursor % POOL_SIZE;
    value = ((value << 8) | pool[index]) >>> 0;
    drawCursor = (drawCursor + 1) % POOL_SIZE;
  }
  return value >>> 0;
};

/** Snapshot the current pool as a base64 string (for display). */
export const entropyToBase64 = (): string => {
  let binary = '';
  for (const byte of pool) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
};
