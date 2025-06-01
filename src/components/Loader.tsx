import { AnimatePresence, motion, Variants } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

interface LoaderProps {
  isLoading: boolean;
  setIsLoading: () => void;
}

function Loader({ isLoading, setIsLoading }: LoaderProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading();
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [setIsLoading]);

  const svgVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: "easeInOut",
      },
    }),
    exit: { 
      opacity: 0, 
      scale: 0.5, 
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      } 
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
        repeatDelay: 0.2
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="loader" 
          initial="hidden" 
          animate="visible" 
          exit="exit"
        >
          <motion.svg
            id="logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            variants={svgVariants}
            custom={0}
          >
            <title>Lohit Kolluri</title>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--theme-color)', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: 'var(--lightest-slate)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <g>
              {/* Letter L */}
              <motion.rect
                x="15"
                y="15"
                width="20"
                height="70"
                fill="url(#grad1)"
                stroke="var(--theme-color)"
                strokeWidth="1.5"
                variants={svgVariants}
                custom={0.5}
                initial="hidden"
                animate="visible"
              />
              <motion.rect
                x="15"
                y="65"
                width="50"
                height="20"
                fill="url(#grad1)"
                stroke="var(--theme-color)"
                strokeWidth="1.5"
                variants={svgVariants}
                custom={0.8}
                initial="hidden"
                animate="visible"
              />

              {/* Letter K */}
              <motion.path
                d="M 65 15 L 65 55 L 45 35 L 65 15 L 85 15 L 65 55 L 85 95 L 65 95 L 65 55"
                fill="url(#grad1)"
                stroke="var(--theme-color)"
                strokeWidth="1.5"
                variants={pathVariants as Variants}
                initial="hidden"
                animate="visible"
              />

              {/* Additional Shapes */}
              <motion.circle
                cx="25"
                cy="25"
                r="5"
                fill="var(--theme-color)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
              <motion.circle
                cx="75"
                cy="75"
                r="5"
                fill="var(--theme-color)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut",
                  delay: 0.5 
                }}
              />
              <motion.polygon
                points="50,10 60,30 40,30"
                fill="var(--theme-color-secondary)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  rotate: 360,
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
              <motion.polygon
                points="30,90 40,70 20,70"
                fill="var(--theme-color-secondary)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  rotate: 360,
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut",
                  delay: 0.7 
                }}
              />

              {/* Glowing Effect */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--theme-color)"
                strokeWidth="1"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  scale: [0.9, 1.05, 0.9],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
            </g>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Loader;