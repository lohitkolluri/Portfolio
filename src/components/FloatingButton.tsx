import { ArrowUp } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

interface FloatingButtonProps {
  showAt?: number;
}

const FloatingButton: FC<FloatingButtonProps> = ({ showAt = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAt) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAt]);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`floating-button ${isVisible ? 'floating-button--visible' : ''}`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default FloatingButton; 