import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header/Index';
import Main from '../Main/Index';
import styles from './index.module.scss'

const App = () => {

    return (
        <div className={styles.app}>
            {/* <Main/> */}
            <Header/>
            <Routes>
                <Route path='/' element={<Main />} />
            </Routes>
        </div>
    );
}

export default App;
