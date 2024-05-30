import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-container"]}>
        © 2024 React Gems | Beatris Ilieve | beatrisilieve@icloud.com
      </div>
    </footer>
  );
};
