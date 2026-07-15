'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

import styles from './Header.module.css';
import type { HeaderProps } from './type';

const MOBILE_BREAKPOINT = 966;

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
    mobileRightNavContent,
    actionsStyle,
    logoStyle,
    navStyle,
    className,
    children,
    ref,
    ...rest
  }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [rightNavOpen, setRightNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Hydrate screen-size state after mount (tránh SSR mismatch)
    useEffect(() => {
      const check = () => {
        const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
        setIsMobile(mobile);
        if (!mobile) {
          setMobileMenuOpen(false);
          setRightNavOpen(false);
        }
      };
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }, []);

    const toggleMenu = useCallback(() => {
      setMobileMenuOpen((prev) => !prev);
      setRightNavOpen(false);
    }, []);

    const closeMenu = useCallback(() => {
      setMobileMenuOpen(false);
    }, []);

    const toggleRightNav = useCallback(() => {
      setRightNavOpen((prev) => !prev);
      setMobileMenuOpen(false);
    }, []);

    const closeRightNav = useCallback(() => {
      setRightNavOpen(false);
    }, []);

    return (
      <>
        <div className={styles.spacer} />
        <header
          className={`${styles.root} ${className || ''}`.trim()}
          ref={ref}
          {...rest}
        >
          {/* ============= DESKTOP VIEW ============= */}
          {!isMobile && (
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
          )}

          {/* ============= MOBILE VIEW ============= */}
          {isMobile && (
            <>
              <nav className={styles.mobileNavbar}>
                <button
                  className={styles.hamburger}
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                  type="button"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={styles.mobileLogo}>{logo}</div>

                <div className={styles.mobileActions}>
                  {typeof mobileActions === 'function'
                    ? mobileActions({ toggleMenu, toggleRightNav })
                    : mobileActions}
                </div>
              </nav>

              {/* Left slide-out drawer */}
              <div
                className={`${styles.mobileMenu} ${
                  mobileMenuOpen ? styles.mobileMenuOpen : ''
                }`.trim()}
              >
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
                  {typeof mobileSidebarContent === 'function'
                    ? mobileSidebarContent(closeMenu)
                    : mobileSidebarContent}
                </div>
              </div>

              {/* Right slide-out drawer */}
              <div
                className={`${styles.rightNav} ${
                  rightNavOpen ? styles.rightNavOpen : ''
                }`.trim()}
              >
                <div className={styles.rightNavCloseWrapper}>
                  <button
                    className={styles.rightNavCloseBtn}
                    onClick={closeRightNav}
                    aria-label="Close menu"
                    type="button"
                  >
                    <X size={20} />
                  </button>
                </div>
                {typeof mobileRightNavContent === 'function'
                  ? mobileRightNavContent(closeRightNav)
                  : mobileRightNavContent}
              </div>

              {/* Overlay */}
              {(mobileMenuOpen || rightNavOpen) && (
                <div
                  className={styles.overlay}
                  onClick={() => {
                    closeMenu();
                    closeRightNav();
                  }}
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </header>
      </>
    );
  },
);

Header.displayName = 'Header';

export default Header;
