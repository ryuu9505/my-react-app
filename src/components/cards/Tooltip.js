import React, { useState } from 'react';

export default function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {React.cloneElement(children, {
        onMouseEnter: () => setVisible(true),
        onMouseLeave: () => setVisible(false),
      })}
      {visible && (
        <span
          style={{
            position: 'absolute',
            top: '-10px',
            right: 0,
            left: 'auto',
            background: 'rgba(40,40,40,0.95)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: '0.8rem',
            whiteSpace: 'nowrap',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {text}
        </span>
      )}
    </>
  );
}
