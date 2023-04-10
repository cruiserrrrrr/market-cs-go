import React, { useRef, useState } from "react";
import ButtonLink from "../../Components/ButtonLink";
import styles from './index.module.scss'
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser, } from '../../store/slices/userSlice'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CustomInput from "../../Components/CustomInput";
import Button from "../../Components/Button";
import axios from "axios";
import BaseToast from "../../Components/BaseToast";

const SignUpForm = () => {

    document.title = "Sign Up"
    const [nameUserSignUp, setNameUserSignUp] = useState('');
    const [passwordUserSignUp, setPasswordUserSignUp] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isToastShown, setIsToastShown] = useState(false);
    const [toastStatus, setToastStatus] = useState('');
    const [toastValue, setToastValue] = useState('');


    const closeToastTimer = useRef();

    const singUp = async (e, email, password) => {
        e.preventDefault();
        const auth = getAuth();
        const signupErrorMessege = 'Error. Check the data you entered.';
        const signupError = 'error';
        const signupSuccess = 'success';
        const signupSuccessMessege = 'Successful registration.';
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.accessToken,
                    }))
                    navigate("/");
                })
                .catch(error => {
                    setToastStatus(signupError)
                    setToastValue(signupErrorMessege)
                    showToast();
                })
            const postData = await axios.post(`https://todos-80as.onrender.com/userList`, {
                email: email,
            })
            setToastStatus(signupSuccess)
            setToastValue(signupSuccessMessege)
            showToast();
        } catch (error) {
            setToastStatus(signupError)
            setToastValue(signupErrorMessege)
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
        <div className={styles.signup_wrapper}>
            <div className={styles.signup_container}>
                <div className={styles.cover}>
                    <div className={styles.form_container}>
                        <h2>Sing Up.</h2>
                        <form className={styles.signup_form}>
                            <CustomInput
                                placeholder="email"
                                type="email"
                                value={nameUserSignUp}
                                onChange={(event) => setNameUserSignUp(event.target.value)}
                            />

                            <CustomInput
                                placeholder="password"
                                type="password"
                                value={passwordUserSignUp}
                                onChange={(event) => setPasswordUserSignUp(event.target.value)}
                            />
                            <p className={styles.pass_messege}>Minimum password length 6 characters.</p>
                            <div className={styles.messege}>
                                {
                                    nameUserSignUp.length === 6 || passwordUserSignUp.length < 6 ?
                                        <Button
                                            value="Sing Up"
                                            color="not_active"
                                            size="medium"
                                            onClick={(e) => dataIncorrect(e)}
                                            iconName="monitor"
                                        />
                                        :
                                        <Button
                                            value="Sing Up"
                                            color="primary"
                                            size="medium"
                                            onClick={(e) => singUp(e, nameUserSignUp, passwordUserSignUp)}
                                            iconName="monitor"
                                        />
                                }
                            </div>
                            <div className={styles.switch_form}>
                                <p>Already have an account? Then</p>
                                <ButtonLink color="none_background" value="Log in" iconName="none" size="text_only" to="/login" />
                            </div>
                        </form>
                    </div>
                    <div className={styles.rules}>
                        <h2>Registration rules.</h2>
                        <ul>
                            <li>
                                <p>Email length at least 6 characters.</p>
                            </li>
                            <li>
                                <p>Password length is at least 6 characters.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                isToastShown && <BaseToast type={toastStatus} value={toastValue} onClick={hideToast} />
            }
        </div >
    )
}

export default SignUpForm;