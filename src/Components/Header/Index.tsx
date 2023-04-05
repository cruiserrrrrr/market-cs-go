import React, { useState } from "react";
import MainLogo from "../MainLogo";
import NavItem from "../NavItem";
import styles from "./index.module.scss";
import { useAuth } from '../../hooks/useAuth';
import ButtonLink from "../ButtonLink";
import Button from "../Button";

interface IHeader {

}

const Header = () => {

    const { isAuth } = useAuth();
    const [burgerActive, setBurgerActive] = useState(true);
    const isBurgerActive = () => setBurgerActive(!burgerActive)


    return (
        <header className={styles.header}>
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
                    {isAuth ?
                        <ButtonLink to="/usercab" iconName="usericon" color="purple" size="circle_medium" />
                        :
                        <>
                            <ButtonLink to="/login" iconName="monitor" value="Log in" color="border" size="medium" />
                            <ButtonLink to="/signup" iconName="monitor" value="Sing Up" color="purple" size="medium" />
                        </>
                    }
                </div>
                <div className={styles.mobile_wrapper}>
                    <div className={styles.mobile_container}>
                        <MainLogo />
                        <div className={styles.nav}>
                            {isAuth ?
                                <ButtonLink to="/usercab" iconName="usericon" color="purple" size="circle_medium" />
                                :
                                <></>
                            }
                            <Button iconName="burger" color="none_background" size="icon_only" onClick={isBurgerActive} />
                        </div>
                    </div>
                </div>
                <div className={burgerActive ? styles.burger_menu_hidden : styles.burger_menu_active} onClick={isBurgerActive}>
                    <div className={styles.container} onClick={e => e.stopPropagation()}>
                        <div className={styles.nav_container}>
                            <div className={styles.auth_wrapper}>
                                {isAuth ?
                                    <></>
                                    :
                                    <>
                                        <ButtonLink onClick={isBurgerActive} to="/login" iconName="monitor" value="Log in" color="border" size="medium" />
                                        <ButtonLink onClick={isBurgerActive} to="/signup" iconName="monitor" value="Sing Up" color="purple" size="medium" />
                                    </>
                                }
                            </div>
                            <ul>
                                <NavItem to="/" title="market" value="Market" onClick={isBurgerActive} />
                                <NavItem to="/faq" title="FAQ" value="FAQ" onClick={isBurgerActive} />
                                <NavItem to="/support" title="Support" value="Support" onClick={isBurgerActive} />
                            </ul>
                        </div>
                        <div className={styles.close_burger}>
                            <Button iconName="close" color="none_background" size="icon_only" onClick={isBurgerActive} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;