import React from 'react';

const logoMap = {
  default: '/logo.png',
  black: '/logo_black.png',
  pink: '/logo_pink.png',
  red: '/logo_red.png',
  white: '/logo_white.png',
  yellow: '/logo_yellow.png',
};

const Logo = ({ size = 120, variant = 'default' }) => (
  <img
    src={logoMap[variant] || logoMap.default}
    alt="Unblind"
    style={{
      display: 'block',
      height: size,
      width: size,
      opacity: 0.9,
    }}
  />
);

export default Logo;
