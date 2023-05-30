import React, { useEffect, useState } from "react";
import MainLogo from "../MainLogo";
import NavItem from "../NavItem";
import styles from "./index.module.scss";
import { useAuth } from '../../hooks/useAuth';
import ButtonLink from "../ButtonLink";
import Button from "../Button";
import { getUserData } from "../../request/getData";

interface IUser {
    email: string,
    userBalance: number;
    id: string,
    telegramToken: any,
    tgNoticeStatus: boolean
}

const Header = () => {

    const { isAuth, email, userBalance } = useAuth();
    const [burgerActive, setBurgerActive] = useState(true);
    const [sticky, setSticky] = useState('');
    const [user, setUser] = useState<IUser>();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        getUserData('https://634eda1fdf22c2af7b44a30d.mockapi.io/userList', setUsers, setLoading)
    }
    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        users.find((item) => {
            if (item.email === email) {
                setUser(item)
            }
        })
        setLoading(true)
    }, [users])
    const isBurgerActive = () => setBurgerActive(!burgerActive)
    const isSticky = () => {
        const scrollTop = window.scrollY;
        const stickyClass = scrollTop >= 1 ? "sticky" : "normal";
        setSticky(stickyClass);
    };

    useEffect(() => {
        window.addEventListener("scroll", isSticky);
    }, []);

    return (
        <header className={`${styles.header} ${styles[sticky]}`}>
            <div className={styles.wrapper}>
                <div className={styles.left_side}>
                    <ul>
                        <NavItem to="/" title="market" value="Market" />
                        <NavItem to="/faq" title="FAQ" value="FAQ" />
                        <NavItem to="/support" title="Support" value="Support" />
                    </ul>
                </div>
                <div className={styles.right_side}>
                    {isAuth ?
                        <>
                            <ButtonLink to="/balance" value={Number(userBalance).toFixed(2) + "$"} color="purple" size="medium" iconName="plus"/>
                            <ButtonLink to="/usercab" iconName="usericon" color="purple" size="circle_medium" />
                        </>
                        :
                        <>
                            <ButtonLink to="/login" iconName="login" value="Log in" color="border" size="medium" />
                            <ButtonLink to="/signup" iconName="signup" value="Sing Up" color="purple" size="medium" />
                        </>
                    }
                </div>
                <div className={styles.mobile_wrapper}>
                    <div className={styles.mobile_container}>
                        <div className={styles.nav}>
                            {isAuth ?
                                <>
                                    <ButtonLink to="/balance" value={Number(userBalance).toFixed(2)} color="purple" size="medium" iconName="plus"/>
                                    <ButtonLink to="/usercab" iconName="usericon" color="purple" size="circle_medium" />
                                </>
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
                            <ul>
                                <NavItem to="/" title="market" value="Market" onClick={isBurgerActive} />
                                <NavItem to="/faq" title="FAQ" value="FAQ" onClick={isBurgerActive} />
                                <NavItem to="/support" title="Support" value="Support" onClick={isBurgerActive} />
                            </ul>
                            <div className={styles.auth_wrapper}>
                                {isAuth ?
                                    <></>
                                    :
                                    <>
                                        <ButtonLink onClick={isBurgerActive} to="/login" iconName="monitor" value="Log in" color="border" size="narrow" />
                                        <ButtonLink onClick={isBurgerActive} to="/signup" iconName="monitor" value="Sing Up" color="purple" size="narrow" />
                                    </>
                                }
                            </div>
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