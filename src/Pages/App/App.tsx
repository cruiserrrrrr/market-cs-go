import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../../Components/Footer/index';
import Header from '../../Components/Header/Index';
import ItemPage from '../ItemPage';
import Main from '../Main/Index';
import NotFound from '../NotFound';
import styles from './index.module.scss'
import UserCab from '../UserCab';
import RegisterPage from '../RegisterPage';
import axios from 'axios';
import FAQPage from '../FAQPage';

const App = () => {

    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState([]);
    const getUsersStatus = async () => {
        try {
            const data = await axios
                .get("http://localhost:3030/usersList")
                .then(res => {
                    setUserData(res.data)
                });
            setLoading(true)
        } catch (e) {
            console.log(e)
        }
    }
    const searchUser = userData.filter((item) => {
        // if (item.userStatus != false) {
        //     return item
        // }
        return item.userStatus === true;
    })
    useEffect(() => {
        getUsersStatus();
        searchUser;
    }, [])
    // console.log(userData)

    return (
        <div className={styles.app}>
            <Header />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/*' element={<NotFound />} />
                <Route path='/item:id' element={<ItemPage />} />
                <Route path='/usercab' element={<UserCab />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/faq' element={<FAQPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
