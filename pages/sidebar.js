import React from "react";
import Link from "next/link";
import styles from "../styles/Sidebar.module.css"; // Ensure this path is correct

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.list}>
        <Link href="#announcements" className={styles.link}>
          <li className={styles.listItem}>
            Announcements
          </li>
        </Link>


        <Link href="#menu" className={styles.link}>
          <li className={styles.listItem}>
          Menu
          </li>
        </Link>


        <Link href="#settings" className={styles.link}>
          <li className={styles.listItem}>
            Settings
          </li>
        </Link>


      </ul>
    </div>
  );
};

export default Sidebar;
