import React, { useState, useRef } from "react";
import ButtonLink from "../../Components/ButtonLink";
import styles from './index.module.scss'
import { useDispatch } from "react-redux";
import { setUser } from '../../store/slices/userSlice'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import Button from "../../Components/Button";
import { useAuth } from "../../hooks/useAuth";
import CustomInput from "../../Components/CustomInput";
import BaseToast from "../../Components/BaseToast";

const LogInForm = () => {
    document.title = "Log In"
    const [nameUserLogIn, setNameUserLogIn] = useState('');
    const [passwordUserLogIn, setPasswordUserLogIn] = useState('');

    const [isToastShown, setIsToastShown] = useState(false);
    const [toastStatus, setToastStatus] = useState('');
    const [toastValue, setToastValue] = useState('');
    const closeToastTimer = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useAuth();
    const logIn = (e, email, password) => {
        e.preventDefault();
        const auth = getAuth();
        const loginErrorMessege = 'Error. Check the data you entered.';
        const loginError = 'error';
        const loginSuccess = 'success';
        const loginSuccessMessege = 'Successful Log In.';
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    console.log(user);
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.accessToken,
                    }))
                    navigate("/");
                })
                .catch(() => {
                    setToastStatus(loginError)
                    setToastValue(loginErrorMessege)
                    showToast();
                })
            setToastStatus(loginSuccess)
            setToastValue(loginSuccessMessege)
            showToast();
        } catch {
            setToastStatus(loginError)
            setToastValue(loginErrorMessege)
            showToast();
        }
    }

    const showToast = () => {
        setIsToastShown(true);
        closeToastTimer.current = window.setTimeout(hideToast, 3000)
    }
    const hideToast = () => {
        setIsToastShown(false)
    }
    const dataIncorrect = (e) => {
        e.preventDefault();
        const signupErrorMessege = 'Check the information you entered.';
        const signupError = 'error';

        setToastStatus(signupError)
        setToastValue(signupErrorMessege)
        showToast();
    }
    return (
        <div className={styles.login_wrapper}>
            <div className={styles.login_container}>
                <h2>Login.</h2>
                <form className={styles.login_form}>
                    <CustomInput placeholder="EMAIL" type="email" value={nameUserLogIn} onChange={(event) => setNameUserLogIn(event.target.value)} />
                    <CustomInput placeholder="password" type="password" value={passwordUserLogIn} onChange={(event) => setPasswordUserLogIn(event.target.value)} />
                    <div className={styles.messege}>
                        {
                            nameUserLogIn.length === 6 || passwordUserLogIn.length < 6 ?
                                <Button
                                    value="Sing Up"
                                    color="not_active"
                                    size="medium"
                                    onClick={(e) => dataIncorrect(e)}
                                    iconName="monitor"
                                />
                                :
                                <Button
                                    value="Log In"
                                    color="primary"
                                    size="medium"
                                    onClick={(e) => logIn(e, nameUserLogIn, passwordUserLogIn)}
                                    iconName="monitor"
                                />
                        }
                    </div>
                    <div className={styles.switch_form}>
                        <p>Not registered yet? Then</p>
                        <ButtonLink color="none_background" value="Sign Up" iconName="none" size="text_only" to="/signup" />
                    </div>
                </form>
            </div>
            {
                isToastShown && <BaseToast type={toastStatus} value={toastValue} onClick={hideToast} />
            }
        </div>
    )
}

export default LogInForm;