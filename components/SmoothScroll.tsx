import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface SmoothScrollProps {
    children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    // Get the scroll position
    const { scrollY } = useScroll();

    // Create a smoothed spring value of the scroll position
    const smoothScrollY = useSpring(scrollY, {
        damping: 20,
        stiffness: 80,
        mass: 1.2,
        restDelta: 0.001
    });

    // Calculate the negative transform based on the smooth scroll value
    const y = useTransform(smoothScrollY, (value) => -value);

    // Update content height for the virtual scroll space
    useEffect(() => {
        const updateHeight = () => {
            if (contentRef.current) {
                setContentHeight(contentRef.current.scrollHeight);
            }
        };

        updateHeight();
        const resizeObserver = new ResizeObserver(updateHeight);
        if (contentRef.current) resizeObserver.observe(contentRef.current);

        return () => resizeObserver.disconnect();
    }, [children]);

    return (
        <>
            {/* 
        This div creates a spacer with the same height as the content.
        This allows the browser to have a normal scrollbar and scroll behavior.
      */}
            <div style={{ height: contentHeight }} />

            {/* 
        This is the fixed container that holds our content.
        We translate it upwards based on the smooth scroll value.
      */}
            <motion.div
                ref={contentRef}
                style={{ y }}
                className="fixed top-0 left-0 w-full overflow-hidden will-change-transform"
            >
                {children}
            </motion.div>
        </>
    );
};

export default SmoothScroll;
