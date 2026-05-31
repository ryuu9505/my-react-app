import ProfileDropdown from '@components/header/ProfileDropdown';
import LoginButton from '@components/LoginButton';
import { RoundedImage } from '@styles/ImageStyles';
import React from 'react';

export default function ProfileSection({
  user,
  loading,
  isDropdownOpen,
  dropdownRef,
  onProfileClick,
  onMyPage,
  onLogout,
}) {
  if (loading) {
    return <div style={{ width: 30, height: 30 }} />;
  }

  if (!user) {
    return <LoginButton />;
  }

  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      ref={dropdownRef}
    >
      <RoundedImage
        src={user.profileImage?.url || '/default-profile.png'}
        $size={30}
        onClick={onProfileClick}
        style={{ cursor: 'pointer' }}
      />
      {isDropdownOpen && (
        <ProfileDropdown onMyPage={onMyPage} onLogout={onLogout} />
      )}
    </div>
  );
}
