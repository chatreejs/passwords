import { useCallback, useEffect, useMemo, useState } from 'react';
import { CharacterType, PasswordOptions, PasswordStrength } from '@interfaces';
import { estimateStrength, generatePassword } from '@utils';

export const MIN_LENGTH = 1;
export const MAX_LENGTH = 50;

export interface UsePasswordGenerator {
  length: number;
  options: PasswordOptions;
  password: string;
  copied: boolean;
  strength: PasswordStrength;
  hasSelection: boolean;
  setLength: (length: number) => void;
  toggleOption: (type: CharacterType) => void;
  regenerate: () => void;
  copyToClipboard: () => void;
}

const DEFAULT_OPTIONS: PasswordOptions = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

const usePasswordGenerator = (): UsePasswordGenerator => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const hasSelection = useMemo(
    () => Object.values(options).some(Boolean),
    [options],
  );

  const regenerate = useCallback(() => {
    setPassword(generatePassword(length, options));
    setCopied(false);
  }, [length, options]);

  // Generate on first render and whenever the settings change.
  useEffect(() => {
    setPassword(hasSelection ? generatePassword(length, options) : '');
    setCopied(false);
  }, [length, options, hasSelection]);

  const toggleOption = useCallback((type: CharacterType) => {
    setOptions((previous) => {
      const next = { ...previous, [type]: !previous[type] };
      // Never allow every option off — keep the last one enabled.
      if (!Object.values(next).some(Boolean)) return previous;
      return next;
    });
  }, []);

  const copyToClipboard = useCallback(() => {
    if (!password) return;
    const markCopied = () => setCopied(true);
    void navigator.clipboard
      .writeText(password)
      .then(markCopied)
      .catch(() => {
        // Fallback for insecure contexts / older browsers.
        const element = document.createElement('textarea');
        element.value = password;
        document.body.appendChild(element);
        element.select();
        document.execCommand('copy');
        document.body.removeChild(element);
        markCopied();
      });
  }, [password]);

  // Auto-clear the "copied" acknowledgement.
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const strength = estimateStrength(length, options);

  return {
    length,
    options,
    password,
    copied,
    strength,
    hasSelection,
    setLength,
    toggleOption,
    regenerate,
    copyToClipboard,
  };
};

export default usePasswordGenerator;
