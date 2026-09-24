import {
  faArrowsRotate,
  faCheck,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './PasswordOutput.css';

interface PasswordOutputProps {
  password: string;
  copied: boolean;
  canRegenerate: boolean;
  onRegenerate: () => void;
  onCopy: () => void;
}

const PasswordOutput: React.FC<PasswordOutputProps> = ({
  password,
  copied,
  canRegenerate,
  onRegenerate,
  onCopy,
}) => (
  <div className="password-output" aria-live="polite">
    <span
      className={`password-output__value${
        password ? '' : ' password-output__value--empty'
      }`}
    >
      {password || 'Pick at least one option'}
    </span>
    <div className="password-output__actions">
      <button
        className="icon-button"
        type="button"
        onClick={onRegenerate}
        disabled={!canRegenerate}
        aria-label="Generate a new password"
        title="Regenerate"
      >
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
      <button
        className="icon-button"
        type="button"
        onClick={onCopy}
        disabled={!password}
        aria-label="Copy password to clipboard"
        title="Copy"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
      </button>
    </div>
  </div>
);

export default PasswordOutput;
