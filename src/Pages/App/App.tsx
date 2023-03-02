import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Footer from '../../Components/Footer/index';
import Header from '../../Components/Header/Index';
import ItemPage from '../ItemPage';
import Main from '../Main/Index';
import NotFound from '../NotFound';
import styles from './index.module.scss'
import UserCab from '../UserCab';

const App = () => {

    return (
        <div className={styles.app}>
            <Header />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/*' element={<NotFound />} />
                <Route path='/item:id' element={<ItemPage />} />
                <Route path='/usercab' element={<UserCab />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
