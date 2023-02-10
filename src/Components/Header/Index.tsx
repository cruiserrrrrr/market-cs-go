import React from "react";
import NavItem from "../NavItem";
import styles from "./index.module.scss";

interface IHeader {

}

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <ul>
                    <NavItem to="/" value="Market" />
                    <NavItem to="/usercab" value="Market" />
                </ul>
            </div>
        </div>
    )
}

export default Header;