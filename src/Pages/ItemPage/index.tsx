import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ItemButton from "../../Components/ItemButton/index";
import Marketitem from "../../Components/MarketItem/index";
import Button from "../../Components/Button/index";
import styles from "./index.module.scss";
import CategoryItem from "../../Components/CategoryItem/index";
import LoadingComponent from "../../Components/LoadingComponent/index";
import axios from "axios";
import Modal from "../../Components/Modal/index";
import ButtonLink from "../../Components/ButtonLink";
import { deleteData, editData, postData, getUserData, getData } from "../../request/getData";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setUser } from '../../store/slices/userSlice'
import { ALL_ITEMS_MOCK, BASE_URL_MOCK, USERLIST, BASE_URL_RENDER, ALL_ITEMS_RENDER } from "../../constanst/constants";
import Alert from "../../Components/Alert/index";


interface IItem {
    name?: string;
    id?: string;
    img?: string;
    type?: string;
    wearAbbreviated?: string;
    wearFull?: string;
    price?: number;
    amount?: number;
    rarity?: any;
    weaponId?: number;
    category?: string;
    buttons?: JSX.Element;
    appearanceHistory?: string;
    patternDescription?: string;
    linkInGAme?: string;
    sellerEmail?: string
}

const ItemPage = () => {

    const loadingItem = {
        name: "Loading...",
        id: "Loading...",
        img: "Loading...",
        type: "Loading...",
        wearAbbreviated: "Loading...",
        wearFull: "Loading...",
        price: 0,
        amount: 0,
        rarity: "Loading...",
        weaponId: 0,
        category: "Loading...",
        appearanceHistory: "Loading...",
        patternDescription: "Loading...",
        linkInGAme: "Loading...",
        sellerEmail: "Loading...",
    }

    const { id } = useParams();
    const { email, userBalance, telegramToken, tgNoticeStatus, token, isAuth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [postLoading, setPostLoading] = useState(false);
    const [onActiveModal, setOnActiveModal] = useState(true);
    const [marketItem, setMamketItem] = useState<IItem>(loadingItem);
    const [renderData, setRenderData] = useState([]);
    const [mockData, setMockData] = useState([]);
    const [data, setData] = useState(renderData);
    const [users, setUsers] = useState([]);
    const [toastShow, setToastShow] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastValue, setToastValue] = useState('');


    const dispatch = useDispatch();
    const location = useLocation();
    const [keyLocation, setKeyLocation] = useState(location.pathname);
    const navigate = useNavigate();

    const getAllData = async () => {
        try {
            await axios.get('https://cs-app-database.onrender.com/allItemsOnSell')
                .then(res => {
                    setRenderData(res.data)
                    // res.data.find(item => {
                    //     if (item.id === id) {
                    //         setMamketItem(item)
                    //     }
                    // })
                })
            // https://634eda1fdf22c2af7b44a30d.mockapi.io/allUsersItemsOnSell
            getData("https://634eda1fdf22c2af7b44a30d.mockapi.io/allUsersItemsOnSell", setMockData, setLoading);
            renderData.concat(mockData)
            setLoading(true);
        } catch (error) {
            console.log(error)
        }
    }
    // useEffect(() => {
    // setAllItems(renderData.concat(mockData))
    // const allItems = renderData.concat(mockData);
    // allItems.find(item => {
    //     if (item.id === id) {
    //         setMamketItem(item)
    //     }
    // })
    // }, []);

    useEffect(() => {
        getAllData()
    }, [keyLocation]);
    console.log(mockData, 'mockdata')
    console.log(renderData, 'asdasd')

    useEffect(() => {
        const filtredMock = mockData.filter(item => item.typeItem === "sell")
        const allItems = renderData.concat(filtredMock)
        setData(allItems)
        allItems.find(item => {
            if (item.id === id) {
                setMamketItem(item)
            }
        })
        console.log(allItems,'allitemsUseEffec')
    }, [renderData]);

    useEffect(() => {
        setMamketItem
    }, [])
    const getUsers = async () => {
        getUserData('https://634eda1fdf22c2af7b44a30d.mockapi.io/userList', setUsers, setLoading)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const userInfo = users.find(item => item.email === email)

    const buyItem = (item) => {
        const CHAT_ID = telegramToken;
        const TOKEN = "5851306296:AAFrPni6Ahnn8yG27fjhnsn5VnlZnjPHanY";
        const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        let message = `<b>Purchase made!</b>\n`;
        message += `<b>Skin: </b>${marketItem.name} (${marketItem.wearFull})\n`;
        message += `<b>By price: </b>${marketItem.price}$\n`;
        message += `<b>Thanks!</b>`;


        const toastSuccessType = 'success';
        const toastErrorType = 'error';
        const toastNotAuth = 'To purchase, you must register.';
        const toastOutBalance = 'You are out of balance.';
        const toastSuccessBuyItem = `Successful Purchase ${item.name}`;
        if (isAuth === false) {
            setToastValue(toastNotAuth);
            setToastType(toastErrorType);
            setToastShow(true);
        } else if (userBalance < item.price) {
            setToastValue(toastOutBalance);
            setToastType(toastErrorType);
            setToastShow(true);
        } else {
            try {
                // send messege from tg
                if (tgNoticeStatus === true) {
                    postData(URL, {
                        chat_id: CHAT_ID,
                        parse_mode: 'html',
                        text: message
                    }, setPostLoading)
                }
                // Replenishment of the seller's balance
                if (item.sellerEmail > '') {
                    const userSeller = users.find(userSeller => userSeller.email === item.sellerEmail)
                    userSeller.userBalance = userSeller.userBalance + item.price;
                    editData(BASE_URL_MOCK + USERLIST, `${userSeller.id}`, userSeller, setPostLoading)
                }
                // delete item in all list
                deleteData(BASE_URL_RENDER + ALL_ITEMS_RENDER + '/', item.id, setPostLoading);
                // send item from inventory
                item.sellerEmail = email;
                item.typeItem = "inventory";
                item.id = Math.floor(Math.random() * 1000000);
                postData(BASE_URL_MOCK + ALL_ITEMS_MOCK, item, setPostLoading);
                // edit balance
                editData(BASE_URL_MOCK + USERLIST, userInfo.id, {
                    id: id,
                    email: email,
                    userBalance: userBalance - item.price,
                    telegramToken: telegramToken
                }, setPostLoading)
                dispatch(setUser({
                    userBalance: userBalance - item.price,
                    email: email,
                    id: id,
                    token: token,
                    telegramToken: telegramToken,
                    tgNoticeStatus: tgNoticeStatus
                }))
                setToastValue(toastSuccessBuyItem);
                setToastType(toastSuccessType);
                setToastShow(true);
                navigate('/usercab');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const similarItems = data.filter(item => item.name === marketItem.name);

    useEffect(() => {
        setKeyLocation(location.pathname)
    }, [location.pathname]);

    document.title = "CS:GO MARKET " + marketItem.name;

    return (
        <div className={styles.wrapper}>
            {loading && marketItem.name != undefined ?
                <div className={styles.container}>
                    <div className={styles.image}>
                        <div className={styles.img_wrapper}>
                            <div className={styles.img_container}>
                                <img src={marketItem.img} alt="" />
                            </div>
                        </div>
                        <div className={styles.image_buttons}>
                            <ButtonLink
                                value="View in game"
                                to={marketItem?.linkInGAme}
                                color="blue"
                                size="medium"
                                iconName="monitor"
                                uppercase="none"
                            />
                        </div>
                    </div>
                    <div className={styles.description}>
                        <div className={styles.info}>
                            <div className={styles.name_description}>
                                <p className={styles.type}>{marketItem.type}</p>
                                <p className={styles.name}>{marketItem.name}</p>
                            </div>
                            <div className={styles.feature}>
                                <CategoryItem value={marketItem.rarity} itemRarity={marketItem.rarity} />
                                <CategoryItem value={marketItem.type} itemRarity="none" />
                            </div>
                            <div className={styles.category}>
                                <div className={styles.category_item}>
                                    <p className={styles.subtitle}>Category</p>
                                    <p className={styles.title}>{marketItem.category}</p>
                                </div>
                                <div className={styles.category_item}>
                                    <p className={styles.subtitle}>Wear</p>
                                    <p className={styles.title}>{marketItem.wearAbbreviated} - {marketItem.wearFull}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.buy_zone}>
                            <div className={styles.buy_zone}>
                                <div className={styles.info}>
                                    <div className={styles.info_container}>
                                        <p className={styles.price}>
                                            {marketItem.price}$
                                        </p>
                                        <div className={styles.quantity}>
                                            <p>Available Quantity — <span>{marketItem.amount}</span></p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    marketItem.sellerEmail === email ?
                                        <div className={styles.buy_zone__warning}>
                                            <p className={styles.warning}>It's your item, you can't buy it.</p>
                                        </div>
                                        :
                                        <div className={styles.button_wrapper}>
                                            <Button
                                                value="Buy"
                                                onClick={() => buyItem(marketItem)}
                                                color="purple"
                                                size="all_width"
                                                iconName="fire"
                                                uppercase="none"
                                            />
                                            <Button
                                                value="Buy by limit"
                                                color="blue"
                                                size="all_width"
                                                iconName="limit"
                                                uppercase="none"
                                                onClick={() => setOnActiveModal(false)}
                                            />
                                        </div>
                                }
                                <Modal activeModal={onActiveModal} setActiveModal={() => setOnActiveModal(true)}>
                                    <p>This feature is currently under development.</p>
                                </Modal>
                            </div>
                        </div>
                        <div className={styles.history}>
                            <div className={styles.history_item}>
                                <p className={styles.title}>Appearance history</p>
                                <p className={styles.item_description}>
                                    {marketItem.appearanceHistory}
                                </p>
                            </div>
                            <div className={styles.history_item}>
                                <p className={styles.title}>Pattern description</p>
                                <p className={styles.item_description}>
                                    {marketItem.patternDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.similar_items}>
                        <div className={styles.similar_container}>
                            {similarItems.map((item) => (
                                <Marketitem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    wearAbbreviated={item.wearAbbreviated}
                                    img={item.img}
                                    price={item.price}
                                    rarity={item.rarity}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                :
                <LoadingComponent />
            }
            {toastShow ?
                <Alert
                    type={toastType}
                    value={toastValue}
                    onClick={() => setToastShow(!toastShow)}
                />
                :
                null
            }
        </div>
    )
}

export default ItemPage;