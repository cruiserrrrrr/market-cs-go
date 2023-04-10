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
// import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from "react-router";
import axios from "axios";

interface IUserCab {

}

const UserCab = (props: IUserCab) => {

    document.title = "User cab";
    const { isAuth, email } = useAuth();
    const dispath = useDispatch();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    // const [dataFireBase, setDataFireBase] = useState([]);
    const [activeSidebar, setActiveSidebar] = useState(true);
    const [windowWidth, setWindowWidth] = useState(!!(window.innerWidth > 610))
    const [dataItems, setDataItems] = useState([]);

    const isActiveSidebar = () => setActiveSidebar(!activeSidebar)

    const navigate = useNavigate();

    const getDataItems = async () => {
        await axios.get(`https://api.npoint.io/f563c815fc2a6c62889f/usersList`)
            .then(res => {
                setDataItems(res.data);
            })
        setLoading(true)
    }
    useEffect(() => {
        getDataItems()
    }, [])
    console.log(dataItems)

    // const db = getDatabase();
    // const dbRef = ref(db, 'usersList');
    // useEffect(() => {
    //     try {
    //         onValue(dbRef, (snapshot) => {
    //             const data = snapshot.val();
    //             setDataFireBase(data)
    //             setLoading(true)
    //         });
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [])

    useEffect(() => {
        dataItems.filter((item) => {
            if (item.email === email) {
                return setUser(item)
            }
        })
    }, [dataItems])

    const logout = () => {
        dispath(removeUser());
        navigate('/login');
    }
    useEffect(() => {
        setWindowWidth(windowWidth)
        console.log(windowWidth)
    }, [windowWidth])

    return (
        <div className={styles.usercab_wrapper}>
            {isAuth ?
                <div className={styles.container}>
                    {
                        loading ?
                            <>
                                <div className={activeSidebar ? styles.sidebar : styles.sidebar_active}>
                                    <div className={styles.profile_info}>
                                        <div className={styles.profile_info}>
                                            <div className={styles.profile_icon}>
                                                <Icon name="usericon" />
                                            </div>
                                            <p className={styles.username}>{email}</p>
                                            <p className={styles.username}>Balance: {user.userBalance}$</p>
                                            <Button color="purple" size="icon_only" iconName="logout" onClick={logout} />
                                        </div>

                                    </div>
                                    <ul className={styles.tabs_buttons}>
                                        <NavItem sizeIcon="icon_medium" iconName="close" to='/usercab/' value="Inventory" title="Inventory" />
                                        <NavItem sizeIcon="icon_medium" iconName="close" to='operationsHistory' value="OperationsHistory" title="OperationsHistory" />
                                        <NavItem sizeIcon="icon_medium" iconName="close" to='purchaseRequests' value="PurchaseRequests" title="PurchaseRequests" />
                                        <NavItem sizeIcon="icon_medium" iconName="close" to='itemsForSale' value="ItemsForSale" title="ItemsForSale" />
                                    </ul>
                                    {windowWidth < !!620 ?
                                        <></>
                                        :
                                        <div className={activeSidebar ? styles.sidebar_control__inside_active : styles.sidebar_control__inside}>
                                            <Button color="purple" size="icon_only" iconName="sidebar_icon" onClick={isActiveSidebar} />
                                        </div>
                                    }
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
            {/* {window.innerWidth > 610 ?
                <></>
                :
                <div className={activeSidebar ? styles.sidebar_control__active : styles.sidebar_control}>
                    <Button color="purple" size="icon_only" iconName="sidebar_icon" onClick={isActiveSidebar} />
                </div>
            } */}
        </div>
    )
}

export default UserCab;