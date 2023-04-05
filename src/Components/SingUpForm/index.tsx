import React, { useState } from "react";
import ButtonLink from "../ButtonLink";
import styles from './index.module.scss'

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser, } from '../../store/slices/userSlice'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CustomInput from "../CustomInput";
import Button from "../Button";
import { getDatabase, ref, set, update } from "firebase/database";
import { useAuth } from "../../hooks/useAuth";

const SignUpForm = () => {

    document.title = "Sign Up"
    const [nameUserSignUp, setNameUserSignUp] = useState('');
    const [passwordUserSignUp, setPasswordUserSignUp] = useState('');
    const [signUpError, setSignUpError] = useState('');

    const db = getDatabase();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useAuth();

    const singUp = (e, email, password) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                navigate("/usercab");
            })
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
                        <Button
                            value="Sing Up"
                            color="purple"
                            size="medium"
                            onClick={(e) => singUp(e, nameUserSignUp, passwordUserSignUp)}
                            iconName="monitor"
                        />
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