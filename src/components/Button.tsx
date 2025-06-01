import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { FunctionComponent, MouseEvent, ReactNode } from 'react';

interface ButtonProps {
  text: string;
  link: string;
  'aria-label'?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  showExternalIcon?: boolean;
  onClick?: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ 
  text, 
  link, 
  className = '', 
  variant = 'primary',
  size = 'md',
  icon,
  showExternalIcon = false,
  onClick,
  ...props 
}) => {
  const isExternal = link.startsWith('http');
  const isFormSubmit = link === '#' && onClick;
  const buttonClass = `btn btn--${variant} btn--${size} ${className}`;
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isFormSubmit) {
      e.preventDefault();
      if (onClick) onClick();
    } else if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link 
      href={link} 
      className={buttonClass}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.currentTarget.click();
        }
      }}
      tabIndex={0}
    >
      {icon && <span className="btn__icon btn__icon--left">{icon}</span>}
      <span className="btn__text">{text}</span>
      {showExternalIcon && isExternal && (
        <span className="btn__icon btn__icon--right">
          <ArrowUpRight size={16} />
        </span>
      )}
    </Link>
  );
};

export default Button;
