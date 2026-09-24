import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faA,
  faAsterisk,
  faCheck,
  faFont,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { CharacterType, PasswordOptions } from '@interfaces';
import './CharacterOptions.css';

interface CharacterOptionsProps {
  options: PasswordOptions;
  onToggle: (type: CharacterType) => void;
}

const OPTION_META: {
  key: CharacterType;
  label: string;
  icon: IconDefinition;
}[] = [
  { key: 'uppercase', label: 'Uppercase', icon: faA },
  { key: 'lowercase', label: 'Lowercase', icon: faFont },
  { key: 'numbers', label: 'Numbers', icon: faHashtag },
  { key: 'symbols', label: 'Symbols', icon: faAsterisk },
];

const CharacterOptions: React.FC<CharacterOptionsProps> = ({
  options,
  onToggle,
}) => (
  <div className="character-options">
    {OPTION_META.map(({ key, label, icon }) => (
      <label key={key} className={`option${options[key] ? ' option--on' : ''}`}>
        <input
          type="checkbox"
          checked={options[key]}
          onChange={() => onToggle(key)}
        />
        <FontAwesomeIcon className="option__icon" icon={icon} fixedWidth />
        <span className="option__label">{label}</span>
        <span className="option__check" aria-hidden="true">
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </label>
    ))}
  </div>
);

export default CharacterOptions;
