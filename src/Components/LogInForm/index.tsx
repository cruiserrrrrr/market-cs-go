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
import InfoLoading from "../InfoLoading";
import Alert from "../Alert";


const LogInForm = () => {
    document.title = "Log In"

    const [nameUserLogIn, setNameUserLogIn] = useState('');
    const [passwordUserLogIn, setPasswordUserLogIn] = useState('');
    const [usersData, setUsersData] = useState([]);
    const [userData, setUserData] = useState(Object);
    const [loading, setLoading] = useState(false);
    const [loginLoaing, setLoginLoading] = useState(false);
    const [toastShow, setToastShow] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastValue, setToastValue] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useAuth();

    useEffect(() => {
        getUserData(BASE_URL_MOCK + USERLIST, setUsersData, setLoading)
    }, [])

    useEffect(() => {
        usersData.find((item) => {
            if (item.email === nameUserLogIn) {
                setUserData(item)
            }
        })
    }, [nameUserLogIn])
    const logIn = (e, email, password) => {
        e.preventDefault();
        const toastSuccessType = 'success';
        const toastErrorType = 'error';
        const toastSuccessValue = 'Successful login.';
        const toastErrorValue = 'Error in the entered data.';
        const auth = getAuth();
        if (nameUserLogIn.length === 6 || passwordUserLogIn.length < 6) {
            // alert('You have not met the conditions.')
            setToastValue(toastErrorValue)
            setToastType(toastErrorType)
            setToastShow(!toastShow)
        } else {
            try {
                usersData.find((item) => {
                    if (item.email === email) {
                        setUserData(item)
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
                        setLoginLoading(true);
                        setToastValue(toastSuccessValue)
                        setToastType(toastSuccessType)
                        setToastShow(!toastShow)
                    })
                    .catch(error => {
                        setToastValue(toastErrorValue)
                        setToastType(toastErrorType)
                        setToastShow(!toastShow)
                    })

            } catch (error) {
                setToastValue(toastErrorValue)
                setToastType(toastErrorType)
                setToastShow(!toastShow)
            }
        }
        setLoginLoading(false)
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
                            loginLoaing ?
                                <InfoLoading />
                                :
                                <Button
                                    value="Log In"
                                    color={nameUserLogIn.length === 6 || passwordUserLogIn.length < 6 ? "not_active" : "purple"}
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
            {
                toastShow ?
                    <Alert
                        type={toastType}
                        value={toastValue}
                        onClick={() => setToastShow(!toastShow)}
                    />
                    :
                    null
            }
        </div>
    )
}

export default LogInForm;