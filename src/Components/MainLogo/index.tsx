import React from "react";
import styles from "./index.module.scss";

const MainLogo = () => {
    return (
        <div className={styles.logo_container}>
            <a className={styles.logo} href="https://github.com/cruiserrrrrr" target="_blank">
                cruise
                <span className={styles.first}>r</span>
                <span className={styles.second}>r</span>
                <span className={styles.third}>r</span>
                <span className={styles.fourth}>r</span>
                <span className={styles.fifth}>r</span>
                <span className={styles.sixth}>r</span>
            </a>
        </div>
    )
}

export default MainLogo;