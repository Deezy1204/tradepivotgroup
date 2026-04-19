"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scroll instantly
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-lenis-prevent', 'true');

    const timer = setTimeout(() => {
      setLoading(false);
      // Unlock after exit animation
      setTimeout(() => {
         document.body.style.overflow = 'unset';
         document.body.removeAttribute('data-lenis-prevent');
      }, 800); 
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-lenis-prevent');
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)]"
        >
          {/* Faint Grid/Texture Background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
          
          <motion.div
            animate={{ 
                scale: [0.95, 1.05, 1],
                opacity: [0, 1, 1]
            }}
            transition={{ 
                duration: 2.5, 
                ease: "easeInOut",
                times: [0, 0.5, 1]
            }}
            className="relative h-40 w-[20rem] md:h-64 md:w-[36rem]"
          >
            <Image
              src="/logo.png"
              alt="Tradepivot Loading"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          {/* Progress Loading Bar */}
          <motion.div 
             className="absolute bottom-16 w-48 h-1 bg-[var(--border-subtle)] rounded-full overflow-hidden"
          >
             <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 3, ease: "easeInOut" }}
                 className="h-full bg-[var(--foreground)]"
             />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
