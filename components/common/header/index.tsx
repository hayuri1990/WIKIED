import { useState } from 'react';
import styles from '@/components/common/header/styles.module.scss';
import MobileMenu from './components/mobileToggle';
import Logo from './components/logo';
import List from './components/list';
import GuestProfile from './components/guestProfile';
import UserProfile from './components/userProfile';
import { useAuth } from '@/contexts/AuthProvider';
import DeskMenu from './components/deskToggle';

const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isDeskMenuOpen, setIsDeskMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const mobileMenu = () => {
    setIsMobileMenu((prev) => !prev);
  };

  const deskMenu = () => {
    setIsDeskMenuOpen((prev) => !prev);
    console.log(isDeskMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenu(false);
    setIsDeskMenuOpen(false);
  };

  return (
    <header className={styles['container']}>
      <div className={styles['logo-item-wrapper']}>
        <Logo />
        <List />
      </div>
      <div className={styles['login-wrapper']}>
        {isLoggedIn ? (
          <UserProfile deskMenu={deskMenu} mobileMenu={mobileMenu} />
        ) : (
          <GuestProfile />
        )}
      </div>
      {isMobileMenu && <MobileMenu handleMenuClose={handleMenuClose} />}
      {isDeskMenuOpen && <DeskMenu handleMenuClose={handleMenuClose} />}
    </header>
  );
};

export default Header;
