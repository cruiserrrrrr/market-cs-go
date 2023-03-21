import React from "react";
import Button from "../Button";
import MainLogo from "../MainLogo";
import NavItem from "../NavItem";
import styles from "./index.module.scss";

interface IHeader {

}

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.left_side}>
                    <MainLogo />
                    <ul>
                        <NavItem to="/" title="market" value="Market" />
                        <NavItem to="/faq" title="FAQ" value="FAQ" />
                        <NavItem to="/support" title="Support" value="Support" />
                    </ul>
                </div>
                <div className={styles.right_side}>
                    {/* <Button iconName="monitor" value="Sing In" color="border" size="medium"/> */}
                    <NavItem to="/usercab" title="user cab" value="User Cab" />
                    <NavItem to="/register" title="Login" value="log In" />
                    <Button iconName="monitor" value="Log in" color="purple" size="medium"/>
                </div>
            </div>
        </div>
    )
}

export default Header;