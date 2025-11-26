import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Hammer, Trophy } from 'lucide-react';

interface JourneyMapProps {
    activeDay: number;
    days: number;
    orientation?: 'vertical' | 'horizontal';
    prefersReducedMotion?: boolean;
}

const JourneyMap: React.FC<JourneyMapProps> = ({
    activeDay,
    days = 3,
    orientation = 'horizontal',
    prefersReducedMotion = false
}) => {
    const icons = [
        { Icon: Flag, label: 'Day 1: Launch' },
        { Icon: Hammer, label: 'Day 2: Build' },
        { Icon: Trophy, label: 'Day 3: Present' }
    ];

    // SVG path for connecting line
    const isVertical = orientation === 'vertical';
    const pathLength = 100;

    return (
        <div className={`w-full ${isVertical ? 'h-64' : 'h-24'} relative`}>
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={isVertical ? "0 0 100 300" : "0 0 300 100"}
                fill="none"
            >
                {/* Background path */}
                <motion.path
                    d={isVertical
                        ? "M 50 10 L 50 290"
                        : "M 10 50 L 290 50"
                    }
                    stroke="rgb(226, 232, 240)" // slate-200
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/* Animated progress path */}
                <motion.path
                    d={isVertical
                        ? "M 50 10 L 50 290"
                        : "M 10 50 L 290 50"
                    }
                    stroke="url(#journey-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: prefersReducedMotion ? 1 : (activeDay + 1) / days }}
                    transition={{
                        duration: prefersReducedMotion ? 0.05 : 1.5,
                        ease: 'easeInOut'
                    }}
                />

                {/* Gradient definition */}
                <defs>
                    <linearGradient id="journey-gradient" gradientUnits="userSpaceOnUse"
                        x1={isVertical ? "50" : "10"}
                        y1={isVertical ? "10" : "50"}
                        x2={isVertical ? "50" : "290"}
                        y2={isVertical ? "290" : "50"}
                    >
                        <stop offset="0%" stopColor="rgb(37, 99, 235)" /> {/* brand-blue */}
                        <stop offset="100%" stopColor="rgb(168, 85, 247)" /> {/* purple-500 */}
                    </linearGradient>
                </defs>
            </svg>

            {/* Milestone dots */}
            <div className={`absolute inset-0 flex ${isVertical ? 'flex-col justify-around items-center' : 'items-center justify-around'} px-4 py-2`}>
                {icons.map((item, idx) => {
                    const isCompleted = idx < activeDay;
                    const isCurrent = idx === activeDay;
                    const { Icon } = item;

                    return (
                        <motion.div
                            key={idx}
                            className="relative flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.2, duration: prefersReducedMotion ? 0.05 : 0.4 }}
                        >
                            {/* Glow effect for current day */}
                            {isCurrent && !prefersReducedMotion && (
                                <motion.div
                                    className="absolute inset-0 bg-brand-blue rounded-full blur-xl opacity-40"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.4, 0.6, 0.4]
                                    }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />
                            )}

                            {/* Icon container */}
                            <motion.div
                                className={`relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    isCompleted || isCurrent
                                        ? 'bg-gradient-to-br from-brand-blue to-brand-dark border-brand-blue'
                                        : 'bg-white border-slate-300'
                                }`}
                                animate={isCurrent && !prefersReducedMotion ? {
                                    scale: [1, 1.1, 1],
                                } : {}}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Icon
                                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                        isCompleted || isCurrent ? 'text-white' : 'text-slate-400'
                                    }`}
                                />
                            </motion.div>

                            {/* Label */}
                            <div className={`absolute ${isVertical ? 'left-16 whitespace-nowrap' : 'top-16'} text-xs font-medium ${
                                isCurrent ? 'text-brand-blue' : 'text-slate-500'
                            }`}>
                                {item.label}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default JourneyMap;
