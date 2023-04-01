import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../../Components/Footer/index';
import Header from '../../Components/Header/Index';
import ItemPage from '../ItemPage';
import Main from '../Main/Index';
import NotFound from '../NotFound';
import styles from './index.module.scss'
import UserCab from '../UserCab';
import RegisterPage from '../RegisterPage';
import FAQPage from '../FAQPage';
import Inventory from "../../Components/Inventory/index";
import OperationsHistory from "../../Components/OperationsHistory";
import PurchaseRequests from "../../Components/PurchaseRequests";
import ItemsForSale from "../../Components/ItemsForSale";
import LogInForm from '../../Components/LogInForm';
import SignUpForm from '../../Components/SingUpForm';

const App = () => {

    return (
        <div className={styles.app} >
            <Header />
            <Routes>
                <Route index path='/' element={<Main />} />
                <Route path='/*' element={<NotFound />} />
                <Route path='/item/:id' element={<ItemPage />} />
                <Route path='/usercab' element={<UserCab />}>
                    <Route index path='/usercab' element={<Inventory />} />
                    <Route path='operationsHistory' element={<OperationsHistory />} />
                    <Route path='purchaseRequests' element={<PurchaseRequests />} />
                    <Route path='itemsForSale' element={<ItemsForSale />} />
                </Route>
                <Route path='/login' element={<LogInForm />} />
                <Route path='/signup' element={<SignUpForm />} />
                <Route path='/faq' element={<FAQPage />} />
            </Routes>
            <Footer />
        </div >
    )
}

export default App;
