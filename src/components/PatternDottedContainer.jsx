import React from 'react';

const PatternDottedContainer = ({ className, children, dark }) => {
    return (
        <div
            className={`relative
                ${dark
                    ? "bg-[radial-gradient(rgba(255,255,255,0.12)_2px,transparent_1px)]"
                    : "bg-[radial-gradient(rgba(0,0,0,0.08)_2px,transparent_1px)]"}
                bg-size-[15px_15px] ${className}`}>
            {children}
        </div>
    );
}

export default PatternDottedContainer;
