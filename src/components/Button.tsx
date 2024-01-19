import React from "react";

interface ButtonProps {
  text: string;
  link: string;
}

const Button: React.FC<ButtonProps> = ({ text, link }) => {
  return (
    <a href={link} className="btn" target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};

export default Button;
