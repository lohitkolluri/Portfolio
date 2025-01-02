import React from 'react';

interface ButtonProps {
  className?: string;
  text: string;
  link: string;
}

const Button: React.FC<ButtonProps> = ({ text, link }) => {
  return (
    <a href={link} className="btn" target="_blank" rel="noopener noreferrer" aria-label={text}>
      {text}
    </a>
  );
};

export default Button;
