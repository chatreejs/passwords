import { StrengthLevel } from '@enums';
import { PasswordOptions, PasswordStrength } from '@interfaces';
import { CHAR_SETS, CHARACTER_TYPES } from './passwordGenerator';

/** Estimate strength from Shannon entropy: length * log2(poolSize). */
export const estimateStrength = (
  length: number,
  options: PasswordOptions,
): PasswordStrength => {
  const poolSize = CHARACTER_TYPES.filter((type) => options[type]).reduce(
    (sum, type) => sum + CHAR_SETS[type].length,
    0,
  );

  if (poolSize === 0 || length === 0) {
    return { label: 'Empty', level: StrengthLevel.Empty };
  }

  const entropy = length * Math.log2(poolSize);
  if (entropy < 40) return { label: 'Weak', level: StrengthLevel.Weak };
  if (entropy < 70) return { label: 'Fair', level: StrengthLevel.Fair };
  if (entropy < 100) return { label: 'Good', level: StrengthLevel.Good };
  return { label: 'Strong', level: StrengthLevel.Strong };
};
