import { useEffect, useState } from 'react';
import { entropyToBase64, mixEntropy } from '@utils';

/**
 * Harvests entropy from pointer movement and exposes it as a base64 string.
 *
 * Each move mixes the cursor coordinates and the high-resolution event
 * timestamp into the shared entropy pool (see `@utils/entropyPool`), which the
 * password generator XORs into its crypto output. State is flushed once per
 * animation frame so the flood of `mousemove` events never thrashes React.
 */
const useMouseEntropy = (): string => {
  const [entropy, setEntropy] = useState('');

  useEffect(() => {
    let frame = 0;
    let dirty = false;

    const handleMove = (event: MouseEvent): void => {
      mixEntropy(event.clientX * 73856093);
      mixEntropy(event.clientY * 19349663);
      mixEntropy(Math.floor(event.timeStamp * 1000));
      dirty = true;
    };

    const flush = (): void => {
      if (dirty) {
        dirty = false;
        setEntropy(entropyToBase64());
      }
      frame = window.requestAnimationFrame(flush);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    frame = window.requestAnimationFrame(flush);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return entropy;
};

export default useMouseEntropy;
