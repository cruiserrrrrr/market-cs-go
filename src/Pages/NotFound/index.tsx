import React from "react";
import NavItem from "../../Components/NavItem/index";
import styles from "./index.module.scss";

const NotFound = () => {
    return (
        <div className={styles.wrapper}>
            <h1>Page not found.</h1>
            <NavItem to="/" title="market" value="Market" />
        </div>
    )
}

export default NotFound;