import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { FC, MouseEvent, ReactNode, useRef, useState, useEffect } from 'react';

interface Button3DProps {
  text: string;
  link: string;
  icon?: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  animated?: boolean;
}

const Button3D: FC<Button3DProps> = ({ 
  text, 
  link, 
  icon, 
  className = '',
  color = 'primary',
  animated = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(animated);
  
  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setIsAnimating(prev => !prev);
      }, 2500);
      
      return () => clearInterval(interval);
    }
  }, [animated]);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCoords({ x, y });
  };
  
  const isExternal = link.startsWith('http');
  
  return (
    <Link
      href={link}
      ref={buttonRef}
      className={`btn-3d btn-3d--${color} ${className} ${isHovered ? 'is-hovered' : ''} ${isPressed ? 'is-pressed' : ''} ${isAnimating ? 'is-animating' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseMove={handleMouseMove}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`,
      } as React.CSSProperties}
    >
      <span className="btn-3d__content">
        {icon && <span className="btn-3d__icon">{icon}</span>}
        <span className="btn-3d__text">{text}</span>
        {isExternal && <ArrowUpRight size={16} className="btn-3d__arrow" />}
      </span>
      <span className="btn-3d__glare"></span>
      <span className="btn-3d__border"></span>
    </Link>
  );
};

export default Button3D; 