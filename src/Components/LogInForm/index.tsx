import React, { useState } from "react";
import ButtonLink from "../ButtonLink";
import styles from './index.module.scss'
import { useDispatch } from "react-redux";
import { setUser } from '../../store/slices/userSlice'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import CustomInput from "../CustomInput";
import Button from "../Button";


const LogInForm = () => {
    document.title ="Log In"
    const [nameUserLogIn, setNameUserLogIn] = useState('');
    const [passwordUserLogIn, setPasswordUserLogIn] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logIn = (e, email, password) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                navigate("/usercab");
            })
            // .catch(console.error)

    }

    return (
        <div className={styles.login_wrapper}>
            <div className={styles.login_container}>
                <h2>Login.</h2>
                <form className={styles.login_form}>
                    <CustomInput placeholder="EMAIL" type="email" value={nameUserLogIn} onChange={(event) => setNameUserLogIn(event.target.value)} />
                    <CustomInput placeholder="password" type="password" value={passwordUserLogIn} onChange={(event) => setPasswordUserLogIn(event.target.value)} />
                    <div className={styles.messege}>
                        <Button
                            value="Log In"
                            color="purple"
                            size="medium"
                            onClick={(e) => logIn(e, nameUserLogIn, passwordUserLogIn)}
                            iconName="monitor"
                        />
                    </div>
                    <div className={styles.switch_form}>
                        <p>Not registered yet? Then</p>
                        <ButtonLink color="none_background" value="Sign Up" iconName="none" size="text_only" to="/signup" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogInForm;