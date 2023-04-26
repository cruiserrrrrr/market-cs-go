import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ButtonLink from "../ButtonLink";
import styles from './index.module.scss'
import { useDispatch } from "react-redux";
import { setUser } from '../../store/slices/userSlice'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import CustomInput from "../CustomInput";
import Button from "../Button";
import { useAuth } from "../../hooks/useAuth";
import { getData, getUserData } from "../../request/getData";
import { BASE_URL_MOCK, USERLIST } from "../../constanst/constants";
import axios from "axios";



const LogInForm = () => {
    document.title = "Log In"

    const [nameUserLogIn, setNameUserLogIn] = useState('');
    const [passwordUserLogIn, setPasswordUserLogIn] = useState('');
    const [usersData, setUsersData] = useState([]);
    const [userData, setUserData] = useState(Object)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useAuth();

    useEffect(() => {
        getUserData('https://634eda1fdf22c2af7b44a30d.mockapi.io/userList', setUsersData, setLoading)
    }, [])

    useEffect(() => {
        usersData.find((item) => {
            if (item.email === nameUserLogIn) {
                setUserData(item)
                setLoading(false)
            }
        })
    }, [nameUserLogIn])
    const logIn = (e, email, password) => {
        e.preventDefault();
        const auth = getAuth();
        setLoading(false)

        try {
            usersData.find((item) => {
                if (item.email === email) {
                    setUserData(item)
                    setLoading(false)
                }
            })
            signInWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.accessToken,
                        telegramToken: userData.telegramToken,
                        userBalance: userData.userBalance,
                        tgNoticeStatus: userData.tgNoticeStatus
                    }))
                    navigate("/usercab");
                })
            setLoading(true)
        } catch (error) {
            alert(error)
        }
    }
    const falseUserData = (e) => {
        e.preventDefault();
        alert('You have not met the conditions.')
    }

    useEffect(() => {
        if (isAuth) {
            navigate("/")
        }
    }, [isAuth]);

    return (
        <div className={styles.login_wrapper}>
            <div className={styles.login_container}>
                <h2>Login.</h2>
                <form className={styles.login_form}>
                    <CustomInput
                        placeholder="EMAIL"
                        type="email"
                        value={nameUserLogIn}
                        onChange={(event) => setNameUserLogIn(event.target.value)}
                    />
                    <CustomInput
                        placeholder="password"
                        type="password"
                        value={passwordUserLogIn}
                        onChange={(event) => setPasswordUserLogIn(event.target.value)}
                    />
                    <div className={styles.messege}>
                        {
                            nameUserLogIn.length === 6 || passwordUserLogIn.length < 6 ?
                                <Button
                                    value="Log In"
                                    color="not_active"
                                    size="medium"
                                    onClick={(e) => falseUserData(e)}
                                    iconName="login"
                                />
                                :
                                <Button
                                    value="Log In"
                                    color="purple"
                                    size="medium"
                                    onClick={(e) => logIn(e, nameUserLogIn, passwordUserLogIn)}
                                    iconName="login"
                                />
                        }
                    </div>
                    <div className={styles.switch_form}>
                        <p>Not registered yet? Then</p>
                        <ButtonLink
                            color="none_background"
                            value="Sign Up"
                            iconName="none"
                            size="text_only"
                            to="/signup"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogInForm;