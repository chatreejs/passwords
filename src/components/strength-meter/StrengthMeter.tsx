import React from 'react';
import { PasswordStrength } from '@interfaces';
import './StrengthMeter.css';

interface StrengthMeterProps {
  strength: PasswordStrength;
}

const StrengthMeter: React.FC<StrengthMeterProps> = ({ strength }) => (
  <div className={`strength strength--${strength.level}`}>
    <div className="strength__bars" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
    <span className="strength__label">{strength.label}</span>
  </div>
);

export default StrengthMeter;
