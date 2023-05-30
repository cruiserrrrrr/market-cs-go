import React, { useState, useEffect } from 'react';
import ButtonLink from '../../Components/ButtonLink/index';
import styles from './index.module.scss';
import BalanceItem from '../../Components/BalanceItem/index';
import LoadingComponent from '../../Components/LoadingComponent/index';
import { editData, getData, getUserData } from '../../request/getData';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';
import { BALANCEDATA_RENDER, BASE_URL_MOCK, BASE_URL_RENDER, USERLIST } from '../../constanst/constants';
import Modal from '../../Components/Modal/index';
import CustomInput from '../../Components/CustomInput/index';
import Button from '../../Components/Button/index';
import { useNavigate } from "react-router";
import InfoLoading from '../../Components/InfoLoading/index';

const BalancePage = () => {

    const { email, token, id, telegramToken, userBalance, tgNoticeStatus, isAuth } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth === false) {
            navigate('/login')
        }
    }, [isAuth])

    const [loading, setLoading] = useState(false);
    const [postLoading, setPostLoading] = useState(false);
    const [activeModal, setActiveModal] = useState(true);
    const [balanceData, setBalanceData] = useState([]);
    const [replenishmentOption, setReplenishmentOption] = useState({ title: '' })
    const [users, setUsers] = useState([]);
    const [amount, setAmount] = useState(1000)
    const dispatch = useDispatch();

    const getBalanceData = () => {
        getData(BASE_URL_RENDER + BALANCEDATA_RENDER, setBalanceData, setLoading)
    }
    useEffect(() => {
        getBalanceData()
    }, [])
    const getUsers = async () => {
        getUserData(BASE_URL_MOCK + USERLIST, setUsers, setLoading)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const userInfo = users.find(item => item.email === email);

    const isActiveModal = (option) => {
        setActiveModal(!activeModal)
        setReplenishmentOption(option)
    }

    const replenishment = (e, value) => {
        e.preventDefault();
        if (value <= 0) {
            alert("Enter a large amount.")
        } else {
            try {
                // Replenishment of the balance
                editData(BASE_URL_MOCK + USERLIST, userInfo.id, {
                    id: id,
                    email: email,
                    userBalance: userBalance + value,
                    telegramToken: telegramToken,
                    tgNoticeStatus: tgNoticeStatus
                }, setPostLoading)
                dispatch(setUser({
                    userBalance: userBalance + value,
                    email: email,
                    id: id,
                    token: token,
                    telegramToken: telegramToken,
                    tgNoticeStatus: tgNoticeStatus
                }))
            } catch (error) {
                console.log(error)
            }
        }
        setPostLoading(false);
    };

    return (
        <div className={styles.balance_page__wrapper}>
            {
                loading ?
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <ButtonLink to="/" value={'Market'} color="border" size="medium" iconName="arrow_left" />
                        </div>
                        <div className={styles.content}>
                            {
                                balanceData.map((balanceItem) => (
                                    <BalanceItem
                                        key={balanceItem.title}
                                        title={balanceItem.title}
                                        image={balanceItem.img}
                                        onClick={() => isActiveModal(balanceItem)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    :
                    <LoadingComponent />
            }
            <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                <div className={styles.option_container}>
                    <div className={styles.option__header}>
                        <p>{replenishmentOption.title}</p>
                    </div>
                    <form>
                        <label>Enter the replenishment amount.</label>
                        <CustomInput placeholder={"1000"} type="number" onChange={(event) => setAmount(event.target.value)} value={amount} />
                    </form>
                    <div className={styles.option__footer}>
                        {
                            postLoading ?
                                <InfoLoading />
                                :
                                <Button
                                    value='Enter'
                                    color={amount <= 0 ? "not_active" : "purple"}
                                    size='medium'
                                    onClick={(e) => replenishment(e, amount)}
                                    iconName="limit"
                                />
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default BalancePage;