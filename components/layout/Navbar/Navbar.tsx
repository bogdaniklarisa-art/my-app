"use client";

import styles from "./Navbar.module.scss";

interface NavbarProps {
  onMenuToggle: () => void;
}

export function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button
          className={styles.hamburger}
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className={styles.searchWrap}>
          <input
            type="search"
            placeholder="Search for anything"
            className={styles.searchInput}
            aria-label="Search"
          />
          <button className={styles.searchBtn} aria-label="Submit search">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <a href="#" className={styles.docsLink}>
          Docs
        </a>

        <button className={styles.notifications} aria-label="Notifications">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          <span className={styles.notifDot} aria-hidden="true" />
        </button>

        <div className={styles.user}>
          <div className={styles.avatar} aria-hidden="true">A</div>
          <span className={styles.userName}>Adedeji</span>
          <svg className={styles.chevron} viewBox="0 0 12 8" fill="none">
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </header>
  );
}
