import React from "react";
import MainLogo from "../MainLogo";
import styles from "./index.module.scss";

const Footer = () => {
    return(
        <footer className={styles.footer_wrapper}>
            <div className={styles.container}>
                <div className={styles.creator}>
                    <MainLogo/>
                </div>
                <div className={styles.info}>

                </div>
                <ul className={styles.links}>

                </ul>
            </div>
        </footer>
    )
}

export default Footer;