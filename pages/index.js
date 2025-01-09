import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Dashboard />
    </div>
  );
}
