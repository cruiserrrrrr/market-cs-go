import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../../Components/Footer/index';
import Header from '../../Components/Header/Index';
import ItemPage from '../ItemPage';
import Main from '../Main/Index';
import NotFound from '../NotFound';
import styles from './index.module.scss'

const App = () => {

    return (
        <div className={styles.app}>
            <Header/>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/*' element={<NotFound />} />
                <Route path='/item:id' element={<ItemPage/>} />
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
