'use client';

import { memo, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

import styles from './Header.module.css';
import type { HeaderProps } from './type';

const Header = memo<HeaderProps>(
  ({
    actionsClassName,
    navClassName,
    logoClassName,
    nav,
    logo,
    actions,
    mobileActions,
    mobileSidebarContent,
    actionsStyle,
    logoStyle,
    navStyle,
    className,
    children,
    ref,
    ...rest
  }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
      setMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
      setMobileMenuOpen(false);
    }, []);

    return (
      <>
      <div className={styles.spacer} />
      <header
        className={`${styles.root} ${className || ''}`.trim()}
        ref={ref}
        {...rest}
      >
        <div className={styles.desktopOnly}>
          <nav className={styles.navbar}>
            <div className={styles.container}>
              <div
                className={`${styles.navBrand} ${logoClassName || ''}`.trim()}
                style={logoStyle}
              >
                {logo}
              </div>
              <div
                className={`${styles.navbarCollapse} ${navClassName || ''}`.trim()}
                style={navStyle}
              >
                {nav}
                {children}
              </div>
              <div
                className={`${styles.navActions} ${actionsClassName || ''}`.trim()}
                style={actionsStyle}
              >
                {actions}
              </div>
            </div>
          </nav>
        </div>

        {/* ===== MOBILE NAV ===== */}
        <div className={styles.mobileOnly}>
          <nav className={styles.mobileNavbar}>
            <button
              className={styles.hamburger}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              type="button"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={styles.mobileLogo}>
              {logo}
            </div>

            <div className={styles.mobileActions}>
              {mobileActions}
            </div>
          </nav>

          {/* Slide-out menu */}
          <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`.trim()}>
            <div className={styles.mobileMenuHeader}>
              <button
                className={styles.closeButton}
                onClick={closeMenu}
                aria-label="Close menu"
                type="button"
              >
                <span>Close</span>
                <X size={20} />
              </button>
            </div>
            <div className={styles.mobileMenuContent}>
              {nav}
              {children}
              {mobileSidebarContent}
            </div>
          </div>

          {/* Overlay */}
          {mobileMenuOpen && (
            <div
              className={styles.overlay}
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}
        </div>
      </header>
      </>
    );
  },
);

Header.displayName = 'Header';

export default Header;
