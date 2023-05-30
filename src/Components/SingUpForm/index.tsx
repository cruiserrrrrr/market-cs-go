import React, { useEffect, useState } from "react";
import ButtonLink from "../ButtonLink";
import styles from './index.module.scss'
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser, } from '../../store/slices/userSlice'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CustomInput from "../CustomInput";
import Button from "../Button";
import { postData } from "../../request/getData";
import { useAuth } from "../../hooks/useAuth";
import { BASE_URL_MOCK, USERLIST } from "../../constanst/constants";
import InfoLoading from "../InfoLoading";
import Alert from "../Alert";


const SignUpForm = () => {

    document.title = "Sign Up"
    const { isAuth } = useAuth();
    useEffect(() => {
        if (isAuth) {
            navigate("/")
        }
    }, [isAuth]);
    const [nameUserSignUp, setNameUserSignUp] = useState('');
    const [toastShow, setToastShow] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastValue, setToastValue] = useState('');
    const [passwordUserSignUp, setPasswordUserSignUp] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const singUp = async (e, email, password) => {
        e.preventDefault();
        const toastSuccessType = 'success';
        const toastErrorType = 'error';
        const toastSuccessValue = 'Successful registration.';
        const toastErrorValue = 'Error in the entered data.';
        const auth = getAuth();
        if (nameUserSignUp.length === 6 || passwordUserSignUp.length < 6) {
            // alert('You have not met the conditions.')
            setToastValue(toastErrorValue)
            setToastType(toastErrorType)
            setToastShow(!toastShow)
        } else {
            try {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(({ user }) => {
                        dispatch(setUser({
                            email: user.email,
                            id: user.uid,
                            token: user.accessToken,
                            userBalance: 1000000
                        }))
                        navigate("/usercab");
                        setToastValue(toastSuccessValue);
                        setToastType(toastSuccessType)
                        setToastShow(!toastShow);;
                    })
                    .catch(error => {
                        setToastValue(toastErrorValue);
                        setToastType(toastErrorType);
                        setToastShow(!toastShow);
                    })
                postData(BASE_URL_MOCK + USERLIST, {
                    email: email,
                    userBalance: 1000000,
                    telegramToken: '',
                    tgNoticeStatus: ''
                }, setLoading)

            } catch (error) {
                setToastValue(toastErrorValue);
                setToastType(toastErrorType);
                setToastShow(!toastShow);
            }
        }
    }

    return (
        <div className={styles.signup_wrapper}>
            <div className={styles.signup_container}>
                <h2>Sing Up.</h2>
                <form className={styles.signup_form}>
                    <CustomInput placeholder="EMAIL" type="email" value={nameUserSignUp} onChange={(event) => setNameUserSignUp(event.target.value)} />
                    <CustomInput placeholder="password" type="password" value={passwordUserSignUp} onChange={(event) => setPasswordUserSignUp(event.target.value)} />
                    <p className={styles.pass_messege}>Minimum password length 6 characters.</p>
                    <div className={styles.messege}>
                        {/*  ?
                                <Button
                                    value="Sing Up"
                                    color="not_active"
                                    size="medium"
                                    onClick={(e) => falseUserData(e)}
                                    iconName="signup"
                                />
                                : */}
                        {
                            loading ?
                                <InfoLoading />
                                :
                                <Button
                                    value="Sing Up"
                                    color={nameUserSignUp.length === 6 || passwordUserSignUp.length < 6 ? "not_active" : "purple"}
                                    size="medium"
                                    onClick={(e) => singUp(e, nameUserSignUp, passwordUserSignUp)}
                                    iconName="signup"
                                />
                        }
                    </div>
                    <div className={styles.switch_form}>
                        <p>Already have an account? Then</p>
                        <ButtonLink color="none_background" value="Log in" iconName="none" size="text_only" to="/login" />
                    </div>
                </form>
            </div>
            {toastShow ?
                <Alert
                    type={toastType}
                    value={toastValue}
                    onClick={() => setToastShow(!toastShow)}
                />
                :
                null
            }
        </div >
    )
}


export default SignUpForm;