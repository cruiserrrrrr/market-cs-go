import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useAuth } from '../../hooks/useAuth';
import ButtonLink from "../ButtonLink";
import Button from "../Button";
import { removeUser } from "../../store/slices/userSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Header = () => {
    const { isAuth, email } = useAuth();
    const navigate = useNavigate();
    const dispath = useDispatch();

    const logout = () => {
        dispath(removeUser());
        navigate('/login');
    }

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                {/* <p className={styles.logo}>Simple</p> */}
                <Link to="/" className={styles.logo}>Simple</Link>
                <div className={styles.right_side}>
                    <p>{email}</p>
                    {isAuth ?
                        <div>
                            <Button value="Logout" onClick={logout} size="medium" color="primary" />
                        </div>
                        :
                        <nav className={styles.nav}>
                            <ButtonLink to="/login" color="primary" size="medium" value="log in" />
                            <ButtonLink to="/signup" color="basic" size="medium" value="sing up" />
                        </nav>
                    }
                </div>
            </div>
            {/* {
                isToastShown && <BaseToast type={toastStatus} value={toastValue} onClick={hideToast} />
            } */}
        </header>
    )
}

export default Header;