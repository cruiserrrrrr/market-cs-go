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


const SignUpForm = () => {

    document.title = "Sign Up"
    const { isAuth } = useAuth();

    const [nameUserSignUp, setNameUserSignUp] = useState('');
    const [passwordUserSignUp, setPasswordUserSignUp] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const singUp = async (e, email, password) => {
        e.preventDefault();
        const auth = getAuth();
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
                })
            postData('https://634eda1fdf22c2af7b44a30d.mockapi.io/userList', {
                email: email,
                userBalance: 1000000,
                telegramToken: '',
                tgNoticeStatus: ''
            })
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
        <div className={styles.signup_wrapper}>
            <div className={styles.signup_container}>
                <h2>Sing Up.</h2>
                <form className={styles.signup_form}>
                    <CustomInput placeholder="EMAIL" type="email" value={nameUserSignUp} onChange={(event) => setNameUserSignUp(event.target.value)} />
                    <CustomInput placeholder="password" type="password" value={passwordUserSignUp} onChange={(event) => setPasswordUserSignUp(event.target.value)} />
                    <p className={styles.pass_messege}>Minimum password length 6 characters.</p>
                    <div className={styles.messege}>
                        {
                            nameUserSignUp.length === 6 || passwordUserSignUp.length < 6 ?
                                <Button
                                    value="Sing Up"
                                    color="not_active"
                                    size="medium"
                                    onClick={(e) => falseUserData(e)}
                                    iconName="signup"
                                />
                                :
                                <Button
                                    value="Sing Up"
                                    color="purple"
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
        </div >
    )
}


export default SignUpForm;