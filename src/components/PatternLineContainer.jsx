import React from 'react';

const PatternLineContainer = ({ className, children, dark }) => {
    return (
        <div
            className={`relative
                ${dark
                    ? "bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_1px,transparent_0,transparent_50%)]"
                    : "bg-[repeating-linear-gradient(315deg,rgba(0,0,0,0.08)_0,rgba(0,0,0,0.08)_1px,transparent_0,transparent_50%)]"}
                bg-size-[10px_10px] ${className}`}>
            {children}
        </div>
    );
}

export default PatternLineContainer;

