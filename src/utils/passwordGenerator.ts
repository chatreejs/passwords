import { CharacterType, PasswordOptions } from '@interfaces';

export const CHAR_SETS: Record<CharacterType, string> = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
};

export const CHARACTER_TYPES = Object.keys(CHAR_SETS) as CharacterType[];

/** Concatenated character pool for the currently enabled options. */
export const buildPool = (options: PasswordOptions): string =>
  CHARACTER_TYPES.filter((type) => options[type])
    .map((type) => CHAR_SETS[type])
    .join('');

/**
 * Cryptographically strong index in [0, max) using rejection sampling so the
 * result is free of modulo bias.
 */
const secureIndex = (max: number): number => {
  const limit = Math.floor(0xffffffff / max) * max;
  const buffer = new Uint32Array(1);
  let value = 0;
  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);
  return value % max;
};

export const generatePassword = (
  length: number,
  options: PasswordOptions,
): string => {
  const pool = buildPool(options);
  if (!pool) return '';

  let result = '';
  for (let i = 0; i < length; i++) {
    result += pool[secureIndex(pool.length)];
  }
  return result;
};
