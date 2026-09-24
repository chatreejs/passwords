import React from 'react';
import './EntropyBackground.css';

interface EntropyBackgroundProps {
  entropy: string;
}

/**
 * Full-screen decorative layer that tiles the harvested entropy across the
 * whole viewport as faint grey text sitting behind the app.
 */
const EntropyBackground: React.FC<EntropyBackgroundProps> = ({ entropy }) => {
  if (!entropy) return null;

  // Repeat so the text always fills the display, however large the viewport.
  const filled = `${entropy} `.repeat(24);

  return (
    <div className="entropy-background" aria-hidden="true">
      {filled}
    </div>
  );
};

export default EntropyBackground;
