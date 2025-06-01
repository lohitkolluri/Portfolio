import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { FC, MouseEvent, ReactNode, useRef, useState } from 'react';

interface Button3DProps {
  text: string;
  link: string;
  icon?: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
}

const Button3D: FC<Button3DProps> = ({ 
  text, 
  link, 
  icon, 
  className = '',
  color = 'primary'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  
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
      className={`btn-3d btn-3d--${color} ${className} ${isHovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
    </Link>
  );
};

export default Button3D; 