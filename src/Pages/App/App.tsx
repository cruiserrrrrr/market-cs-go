import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header/Index';
import Main from '../Main/Index';
import styles from './index.module.scss'
import LogInForm from '../LogInForm/index';
import SignUpForm from '../SingUpForm';
import Banners from '../Banners';
import { useAuth } from '../../hooks/useAuth';
import NotFound from '../NotFound';

const App = () => {

    const { isAuth } = useAuth();
    return (
        <div className={styles.app} >
            <Header />
            <Routes>
                {isAuth ?
                    <Route index path='/' element={<Main />} />
                    :
                    <>
                        <Route path='/login' element={<LogInForm />} />
                        <Route path='/signup' element={<SignUpForm />} />
                        <Route path='/' element={<Banners />} />
                    </>
                }
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </div >
    )
}

export default App;
