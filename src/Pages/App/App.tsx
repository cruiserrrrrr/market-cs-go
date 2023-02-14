import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header/Index';
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
            </Routes>
        </div>
    );
}

export default App;
