import React from "react";
import MainLogo from "../MainLogo";
import NavItem from "../NavItem";
import styles from "./index.module.scss";

interface IHeader {

}

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <MainLogo/>
                <ul>
                    <NavItem to="/" title="market" value="Market"/>
                    <NavItem to="/faq" title="FAQ" value="FAQ" />
                    <NavItem to="/support" title="Support" value="Support" />
                </ul>
            </div>
        </div>
    )
}

export default Header;