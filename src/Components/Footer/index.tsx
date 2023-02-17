import React from "react";
import MainLogo from "../MainLogo";
import styles from "./index.module.scss";

const Footer = () => {
    return(
        <div className={styles.footer_wrapper}>
            <div className={styles.container}>
                <div className={styles.creator}>
                    <MainLogo/>
                    <p>Copyright © 2023 UI8 LLC. All rights reserved</p>
                </div>
                <div className={styles.info}>

                </div>
                <ul className={styles.links}>

                </ul>
            </div>
        </div>
    )
}

export default Footer;