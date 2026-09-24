import React from 'react';
import './LengthSlider.css';

interface LengthSliderProps {
  length: number;
  min: number;
  max: number;
  onChange: (length: number) => void;
}

const LengthSlider: React.FC<LengthSliderProps> = ({
  length,
  min,
  max,
  onChange,
}) => (
  <div className="length-slider">
    <div className="length-slider__row">
      <label htmlFor="length" className="length-slider__label">
        Length
      </label>
      <span className="length-slider__badge">{length}</span>
    </div>
    <input
      id="length"
      className="length-slider__input"
      type="range"
      min={min}
      max={max}
      value={length}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  </div>
);

export default LengthSlider;
