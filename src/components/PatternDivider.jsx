import React from 'react';

const PatternDivider = ({ className, dark }) => {
    return (
        <div
            className={`relative h-10 before:absolute before:-left-[100vw]
                border-l border-r ${dark ? 'border-neutral-700' : 'border-gray-300'}
                before:border ${dark ? 'before:border-neutral-700' : 'before:border-gray-300'}
                before:h-10 before:w-[200vw]
                ${dark
                    ? "before:bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_1px,transparent_0,transparent_50%)]"
                    : "before:bg-[repeating-linear-gradient(315deg,rgba(0,0,0,0.08)_0,rgba(0,0,0,0.08)_1px,transparent_0,transparent_50%)]"}
                before:bg-size-[10px_10px] ${className}`}
        />
    );
}

export default PatternDivider;
