import Image from "next/image";
import styles from "./page.module.css";
import App from "./components/App";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <App />
      {/* TODO: move footer to layout.js */}
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
