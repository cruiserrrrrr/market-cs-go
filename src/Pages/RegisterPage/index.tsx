import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/index";
import CustomInput from "../../Components/CustomInput/index";
import styles from './index.module.scss';
import { useDispatch } from "react-redux";
import { setUser, removeUser } from '../../store/slices/userSlice'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, ActionCodeOperation } from "firebase/auth";


interface IRegisterPage {

}

const RegisterPage = (props: IRegisterPage) => {

    const { } = props;
    const [usersDataFetch, setUsersDataFetch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nameUserLogIn, setNameUserLogIn] = useState('');
    const [passwordUserLogIn, setPasswordUserLogIn] = useState('');
    const [nameUserSignUp, setNameUserSignUp] = useState('');
    const [passwordUserSignUp, setPasswordUserSignUp] = useState('');
    const [activeForm, setActiveForm] = useState(true);
    const [fireBaseData, setFireBaseData] = useState([]);


    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isActiveForm = (e) => {
        e.preventDefault();
        setActiveForm(!activeForm);
    };

    const logIn = (e, email, password) => {
        e.preventDefault();
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            // .then(console.log)
            // .catch(console.error)
            .then(({ user }) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                navigate("/");
            })
            .catch(console.error)

    }
    const singUp = (e, email, password) => {

        e.preventDefault();
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            // .then(console.log)
            // .catch(console.error)
            .then(({ user }) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                navigate("/");
            })
            .catch(console.error)
    }
    return (
            <div className={styles.authorization_wrapper}>
                <div className={activeForm ? styles.register_container : styles.register_container_hidden}>
                    <h2>Login.</h2>
                    <form className={styles.register_form}>
                        <CustomInput placeholder="name" type="text" value={nameUserLogIn} onChange={(event) => setNameUserLogIn(event.target.value)} />
                        <CustomInput placeholder="pass" type="password" value={passwordUserLogIn} onChange={(event) => setPasswordUserLogIn(event.target.value)} />
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
                            <p>Already have an account? Then</p>
                            <Button color="none_background" value="Sign Up" iconName="none" size="text_only" onClick={isActiveForm} />
                        </div>
                    </form>
                </div>
                <div className={activeForm ? styles.login_container_hidden : styles.login_container}>
                    <h2>Sing Up.</h2>
                    <form className={styles.register_form}>
                        <CustomInput placeholder="name" type="text" value={nameUserSignUp} onChange={(event) => setNameUserSignUp(event.target.value)} />
                        <CustomInput placeholder="pass" type="password" value={passwordUserSignUp} onChange={(event) => setPasswordUserSignUp(event.target.value)} />
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
                            <p>Not registered yet? Then</p>
                            <Button color="none_background" value="Log in" iconName="none" size="text_only" onClick={isActiveForm} />
                        </div>
                    </form>
                </div>
            </div >
        )
}

export default RegisterPage;