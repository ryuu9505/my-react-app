import ProfileSection from '@components/header/ProfileSection';
import Logo from '@components/Logo';
import useProfileDropdown from '@hooks/useProfileDropdown';
import HeaderLayout from '@layouts/HeaderLayout';
import { LAYOUT } from '@styles/constants';
import { HeaderContainer, NavLink, NavMenu } from '@styles/layout/HeaderStyles';
import { sectionConfig } from '@utils/sections';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll';

const HEADER_HEIGHT = LAYOUT.HEADER_HEIGHT;

function Header({ sectionVisibility }) {
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
      <HeaderLayout height={HEADER_HEIGHT}>
        <HeaderContainer>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <RouterLink
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '48px',
              }}
            >
              <Logo variant="black" size={24} />
            </RouterLink>
          </div>
          <NavMenu>
            {sectionConfig.map(
              (section) =>
                sectionVisibility[section.id] && (
                  <NavLink key={section.id}>
                    <Link
                      to={section.id}
                      smooth={true}
                      duration={500}
                      offset={section.offset}
                    >
                      {section.label}
                    </Link>
                  </NavLink>
                )
            )}
          </NavMenu>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '16px',
              marginLeft: '48px',
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
      </HeaderLayout>
      <div style={{ paddingTop: HEADER_HEIGHT }} />
    </>
  );
}

export default Header;
