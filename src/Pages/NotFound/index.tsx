import React from "react";
import NavItem from "../../Components/NavItem/index";
import styles from "./index.module.scss";

const NotFound = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Page not found...</h1>
                <h1 className={styles.title_shadow}>Page not found...</h1>
            </div>
            <NavItem to="/" title="market" value="Market" />
        </div>
    )
}

export default NotFound;