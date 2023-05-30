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
import { useNavigate } from "react-router";
import { editData, getData, getUserData } from "../../request/getData";
import InfoLoading from "../../Components/InfoLoading";
import CustomInput from "../../Components/CustomInput/index";
import Toggle from "../../Components/Toggle/index";
import Modal from "../../Components/Modal/index";
import { BASE_URL_MOCK, USERLIST, BASE_URL_RENDER, ADD_TG_DATA } from "../../constanst/constants";
import { setUser } from '../../store/slices/userSlice';

interface IUserCab {

}

interface IUser {
    email: string,
    userBalance: number;
    id: string,
    telegramToken: any,
    tgNoticeStatus: boolean
}

const UserCab = (props: IUserCab) => {

    document.title = "Profile";

    const { isAuth, email, userBalance, telegramToken, id, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth === false) {
            navigate('/login')
        }
    }, [isAuth])

    const [loading, setLoading] = useState(true);
    const [postLoading, setPostLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<IUser>();
    const [activeSidebar, setActiveSidebar] = useState(true);
    const [windowWidth, setWindowWidth] = useState(Number)
    const [users, setUsers] = useState([]);
    const [userTelegramToken, setUserTelegramToken] = useState('');
    const [chkBox, setChkBox] = useState(Boolean);
    const [infoTgModal, setInfoTgModal] = useState(true);
    const [tgDataLoading, setTgDataLoading] = useState(true)
    const [tgData, setTgData] = useState([]);

    const dispatch = useDispatch();
    const isActiveSidebar = () => setActiveSidebar(!activeSidebar)

    const activeModal = () => setInfoTgModal(!infoTgModal)

    const getUsers = async () => {
        getUserData(BASE_URL_MOCK + USERLIST, setUsers, setLoading)
    }

    const getTGData = async () => {
        getData(BASE_URL_RENDER + ADD_TG_DATA, setTgData, setTgDataLoading)
    }

    const logout = () => {
        dispatch(removeUser());
        navigate('/login');
    }

    useEffect(() => {
        getUsers()
        getTGData()
    }, [])

    useEffect(() => {
        users.find((item) => {
            if (item.email === email) {
                setUserInfo(item)
                setChkBox(!!item.tgNoticeStatus)
            }
        })
        setLoading(true)
    }, [users])

    useEffect(() => {
        setUserInfo
    }, [])
    useEffect(() => {
        const windowSize = window.innerWidth;
        setWindowWidth(windowSize)
    }, [windowWidth])

    const addTelegramm = async (e, userToken) => {
        e.preventDefault();
        editData(BASE_URL_MOCK + USERLIST, userInfo.id, {
            email: email,
            userBalance: userInfo.userBalance,
            telegramToken: userToken
        }, setPostLoading)
    }
    const falseUserData = (e) => {
        e.preventDefault();
        alert('You have not met the conditions.')
    }

    const onTgNotice = () => {
        editData(BASE_URL_MOCK + USERLIST, userInfo.id, {
            email: email,
            userBalance: userInfo.userBalance,
            telegramToken: userInfo?.telegramToken,
            tgNoticeStatus: true
        }, setPostLoading);
        dispatch(setUser({
            userBalance: userBalance,
            email: email,
            id: id,
            token: token,
            telegramToken: telegramToken,
            tgNoticeStatus: true
        }))
    }
    const offTgNotice = () => {
        editData(BASE_URL_MOCK + USERLIST, userInfo.id, {
            email: email,
            userBalance: userInfo.userBalance,
            telegramToken: userInfo?.telegramToken,
            tgNoticeStatus: false
        }, setPostLoading);
        dispatch(setUser({
            userBalance: userBalance,
            email: email,
            id: id,
            token: token,
            telegramToken: telegramToken,
            tgNoticeStatus: false
        }))
    }
    const toggledTg = async () => {
        setChkBox(!chkBox)
        userInfo.tgNoticeStatus ?
            offTgNotice()
            :
            onTgNotice()
    }

    return (
        <div className={styles.usercab_wrapper}>
            <div className={styles.container}>
                {loading ?
                    <>
                        <div className={activeSidebar ? styles.sidebar : styles.sidebar_active}>
                            <div className={styles.profile_info}>
                                <div className={styles.profile_icon}>
                                    <Icon name="usericon" />
                                </div>
                                {userBalance === undefined ?
                                    <InfoLoading />
                                    :
                                    <>
                                        <p className={styles.username}>{email}</p>
                                        <p>Balance: {Number(userBalance).toFixed(2)}$</p>
                                        {!!telegramToken ?
                                            <div className={styles.any_info}>
                                                <p className={styles.tg}>Notice TG:</p>
                                                <Toggle checked={chkBox} onToggled={() => toggledTg()} />
                                            </div>
                                            :
                                            <div className={styles.any_info}>
                                                <CustomInput
                                                    placeholder="Chat id"
                                                    type="number"
                                                    onChange={(event) => setUserTelegramToken(event.target.value)}
                                                    value={userTelegramToken}
                                                />
                                                <Button
                                                    color={!!userTelegramToken ? "purple" : "not_active"}
                                                    size="icon_only"
                                                    iconName="check_mark"
                                                    onClick={
                                                        !!userTelegramToken ?
                                                            (e) => addTelegramm(e, userTelegramToken)
                                                            :
                                                            (e) => falseUserData(e)
                                                    }
                                                />
                                                <Button
                                                    color={"purple"}
                                                    size="icon_only"
                                                    iconName="question_mark"
                                                    onClick={activeModal}
                                                />
                                            </div>
                                        }
                                    </>
                                }
                                <Button color="purple" size="medium" value="Logout" iconName="logout" onClick={logout} />
                            </div>
                            <ul className={styles.tabs_buttons}>
                                <NavItem to='/usercab/' value="Inventory" title="Inventory" />
                                <NavItem to='operationsHistory' value="Operations History" title="OperationsHistory" />
                                <NavItem to='purchaseRequests' value="Purchase Requests" title="PurchaseRequests" />
                                {/* <NavItem to='itemsForSale' value="ItemsForSale" title="ItemsForSale" /> */}
                            </ul>
                            {windowWidth < 610 ?
                                <div className={activeSidebar ? styles.sidebar_control__active : styles.sidebar_control}>
                                    <Button color="purple" size="icon_only" iconName="sidebar_icon" onClick={isActiveSidebar} />
                                </div>
                                :
                                <></>
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
            <Modal activeModal={infoTgModal} setActiveModal={setInfoTgModal}>
                {
                    tgDataLoading ?
                        <div className={styles.tg_info}>
                            <h2 className={styles.title}>How to add your telegram chat id?</h2>
                            <div className={styles.content}>
                                {
                                    tgData.map((tgItem) => (
                                        <div className={styles.item} key={tgItem.title}>
                                            <div className={styles.item_info}>
                                                <p>{tgItem.title}{tgItem.link.length != 0 ? <a href={tgItem.link}> open bot.</a> : <></>}</p>
                                            </div>
                                            <img
                                                className={styles.item_img}
                                                src={tgItem.img}
                                                alt="search bot"
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        :
                        <LoadingComponent />
                }
            </Modal>
        </div>
    )
}

export default UserCab;