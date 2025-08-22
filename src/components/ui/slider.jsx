import React from 'react';

const Slider = React.forwardRef(({ 
  className, 
  min = 0, 
  max = 100, 
  step = 1, 
  value, 
  onValueChange, 
  ...props 
}, ref) => {
  const handleChange = (e) => {
    if (onValueChange) {
      onValueChange([parseFloat(e.target.value)]);
    }
  };

  return (
    <div className={`relative flex w-full touch-none items-center ${className || ''}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value?.[0] || 0}
        onChange={handleChange}
        ref={ref}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
        {...props}
      />
    </div>
  );
});

Slider.displayName = "Slider";

export { Slider };