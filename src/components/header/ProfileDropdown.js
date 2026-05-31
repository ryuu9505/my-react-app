import React from 'react';

const menuItemStyle = {
  display: 'block',
  width: '100%',
  padding: '10px 20px',
  cursor: 'pointer',
  fontWeight: 300,
  fontSize: 'inherit',
  fontFamily: 'inherit',
  color: '#222',
  background: 'none',
  border: 'none',
  textAlign: 'left',
};

export default function ProfileDropdown({ onMyPage, onLogout }) {
  return (
    <div
      className="profile-dropdown"
      role="menu"
      style={{
        position: 'absolute',
        top: 50,
        right: 0,
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        borderRadius: 8,
        minWidth: 120,
        zIndex: 2000,
        padding: '4px 0',
      }}
    >
      <button role="menuitem" style={menuItemStyle} onClick={onMyPage}>
        My Page
      </button>
      <button role="menuitem" style={menuItemStyle} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
