import ProfileSection from '@components/header/ProfileSection';
import Logo from '@components/Logo';
import useProfileDropdown from '@hooks/useProfileDropdown';
import { HeaderContainer } from '@styles/layout/HeaderStyles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function BasicHeader() {
  const {
    user,
    loading,
    isDropdownOpen,
    dropdownRef,
    handleProfileClick,
    handleMyPage,
    handleLogout,
  } = useProfileDropdown();

  return (
    <>
      <HeaderContainer>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        ></div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RouterLink to="/">
            <Logo variant="black" size={24} />
          </RouterLink>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <ProfileSection
            user={user}
            loading={loading}
            isDropdownOpen={isDropdownOpen}
            dropdownRef={dropdownRef}
            onProfileClick={handleProfileClick}
            onMyPage={handleMyPage}
            onLogout={handleLogout}
          />
        </div>
      </HeaderContainer>
    </>
  );
}

export default BasicHeader;
