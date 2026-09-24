import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  CharacterOptions,
  LengthSlider,
  PasswordOutput,
  StrengthMeter,
} from '@components';
import { MAX_LENGTH, MIN_LENGTH, usePasswordGenerator } from '@hooks';
import './Generator.css';

const Generator: React.FC = () => {
  const {
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
  } = usePasswordGenerator();

  return (
    <div className="generator">
      <header className="generator__header">
        <span className="generator__logo" aria-hidden="true">
          <FontAwesomeIcon icon={faShieldHalved} />
        </span>
        <h1 className="generator__title">Password Generator</h1>
        <p className="generator__subtitle">Strong, random, and yours.</p>
      </header>

      <PasswordOutput
        password={password}
        copied={copied}
        canRegenerate={hasSelection}
        onRegenerate={regenerate}
        onCopy={copyToClipboard}
      />

      <StrengthMeter strength={strength} />

      <LengthSlider
        length={length}
        min={MIN_LENGTH}
        max={MAX_LENGTH}
        onChange={setLength}
      />

      <CharacterOptions options={options} onToggle={toggleOption} />

      <button
        className="generate-button"
        type="button"
        onClick={regenerate}
        disabled={!hasSelection}
      >
        Generate password
      </button>
    </div>
  );
};

export default Generator;
