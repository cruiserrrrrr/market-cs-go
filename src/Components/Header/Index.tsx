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
                    <NavItem to="/" title="market" value="Market"/>
                    <NavItem to="/usercab" title="usercab" value="usercab" />
                </ul>
            </div>
        </div>
    )
}

export default Header;