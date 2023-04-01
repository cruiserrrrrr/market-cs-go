import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import styles from "./index.module.scss";
import Icon from "../../Components/Icon/index";
import NavItem from "../../Components/NavItem/index";
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import Button from "../../Components/Button/index";
import { removeUser } from "../../store/slices/userSlice";
import LoadingComponent from "../../Components/LoadingComponent/index";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from "react-router";

interface IUserCab {

}

const UserCab = (props: IUserCab) => {

    document.title = "User cab";
    const { isAuth, email } = useAuth();
    const dispath = useDispatch();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [dataFireBase, setDataFireBase] = useState([]);
    const navigate = useNavigate();

    const db = getDatabase();
    const dbRef = ref(db, 'usersList');
    useEffect(() => {
        try {
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                setDataFireBase(data)
                setLoading(true)
            });
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        dataFireBase.filter((item) => {
            if (item.email === email) {
                return setUser(item)
            }
        })
    }, [dataFireBase])

    const logout = () => {
        dispath(removeUser());
        navigate('/login');
    }

    return (
        <div className={styles.usercab_wrapper}>
            {isAuth ?
                <div className={styles.container}>
                    {
                        loading ?
                            <>
                                <div className={styles.sidebar}>
                                    <div className={styles.profile_info}>
                                        <div className={styles.profile_info}>
                                            <div className={styles.profile_icon}>
                                                <Icon name="usericon" />
                                            </div>
                                            <p className={styles.username}>{email}</p>
                                            <p className={styles.username}>Balance: {user.userBalance}$</p>
                                            <Button color="purple" size="medium" value="logout" onClick={logout} />
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <ul className={styles.tabs_buttons}>
                                        <NavItem to='/usercab/' value="Inventory" title="Inventory" />
                                        <NavItem to='operationsHistory' value="OperationsHistory" title="OperationsHistory" />
                                        <NavItem to='purchaseRequests' value="PurchaseRequests" title="PurchaseRequests" />
                                        <NavItem to='itemsForSale' value="ItemsForSale" title="ItemsForSale" />
                                    </ul>
                                </div>
                                <div className={styles.tabs_container}>
                                    <Outlet />
                                </div>
                            </>
                            :
                            <LoadingComponent />
                    }
                </div>
                :
                <Navigate to="/register" />
            }
        </div>
    )
}

export default UserCab;