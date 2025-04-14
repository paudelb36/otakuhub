import React from 'react';

// This Button component accepts props for variant, size, and additional styles
const Button = ({ variant = 'filled', size = 'md', className = '', children, ...props }) => {
  // Determine the base class for the button based on the variant and size
  const baseClass = "inline-flex items-center justify-center rounded-md focus:outline-none transition-all";

  const variantClass = variant === 'outline'
    ? 'border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-100'
    : 'bg-purple-600 text-white hover:bg-purple-700';

  const sizeClass = size === 'sm'
    ? 'px-4 py-2 text-sm'
    : size === 'lg'
    ? 'px-6 py-3 text-lg'
    : 'px-5 py-2.5 text-md'; // Default to medium size

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
