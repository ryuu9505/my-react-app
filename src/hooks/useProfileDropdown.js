import { useAuth } from '@components/AuthProvider';
import useClickOutside from '@hooks/useClickOutside';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useProfileDropdown() {
  const { user, loading, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMyPage = () => {
    if (user?.username) {
      navigate(`/${user.username}`);
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return {
    user,
    loading,
    isDropdownOpen,
    dropdownRef,
    handleProfileClick,
    handleMyPage,
    handleLogout,
  };
}
