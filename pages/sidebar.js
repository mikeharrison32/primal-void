import React from "react";
import Link from "next/link";
import styles from "../styles/Sidebar.module.css"; // Ensure this path is correct

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Sidebar</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="#announcements" className={styles.link}>
            Announcements
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="#menu" className={styles.link}>
            Menu
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="#settings" className={styles.link}>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
