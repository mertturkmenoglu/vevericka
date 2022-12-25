import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ text, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
    >
      {text}
    </button>
  );
});

export default Button;
