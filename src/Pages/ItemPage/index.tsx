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
import { deleteData, editData, postData, getUserData } from "../../request/getData";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setUser } from '../../store/slices/userSlice'


interface IItem {
    name: string;
    id: string;
    img: string;
    type: string;
    wearAbbreviated: string;
    wearFull: string;
    price: number;
    amount: number;
    rarity: any;
    weaponId: number;
    category: string;
    buttons: JSX.Element;
    appearanceHistory: string;
    patternDescription: string;
    linkInGAme: string;
    sellerEmail: string
}

const ItemPage = () => {

    document.title = "CS:GO MARKET";

    const { id } = useParams();
    const { email, userBalance, telegramToken, tgNoticeStatus, token, isAuth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [statusBuy, setStatusBuy] = useState(0);
    const [onActiveModal, setOnActiveModal] = useState(true);
    const [marketItem, setMamketItem] = useState<IItem>();
    const [dataFireBase, setDataFireBase] = useState([]);
    const [data, setData] = useState(dataFireBase);
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();
    const location = useLocation();
    const [sportKeyLocation, setSportKeyLocation] = useState(location.pathname);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const getItemData = await axios.get('https://cs-app-database.onrender.com/allItemsOnSell')
                .then(res => {
                    setDataFireBase(res.data)
                    res.data.find(item => {
                        if (item.id === id) {
                            setMamketItem(item)
                        }
                    })
                })
            setLoading(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [sportKeyLocation])

    useEffect(() => {
        setData(dataFireBase)
    }, [dataFireBase])

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

        if (isAuth === false) {
            alert("For this you need to log in.")
        }else if(userBalance < item.price){
            alert("You don't have enough money to buy an item.")
        }else {
            try {
                // send messege from tg
                if (tgNoticeStatus) {
                    postData(URL, {
                        chat_id: CHAT_ID,
                        parse_mode: 'html',
                        text: message
                    })
                }
                // delete item in all list
                deleteData(`https://cs-app-database.onrender.com/allItemsOnSell/`, item.id);
                // send item from inventory
                item.sellerEmail = email;
                item.typeItem = "inventory";
                item.id = Math.floor(Math.random() * 1000000);
                postData('https://634eda1fdf22c2af7b44a30d.mockapi.io/allUsersItemsOnSell', item);
                // edit balance
                editData('https://634eda1fdf22c2af7b44a30d.mockapi.io/userList/', userInfo.id, {
                    id: id,
                    email: email,
                    userBalance: userBalance - item.price,
                    telegramToken: telegramToken
                })
                dispatch(setUser({
                    userBalance: userBalance - item.price,
                    email: email,
                    id: id,
                    token: token,
                    telegramToken: telegramToken,
                    tgNoticeStatus: tgNoticeStatus
                }))
                alert(`You buy ${item.name}`)
                navigate('/usercab')
            } catch (error) {
                console.log(error);
            }
        }
    };

    const similarItems = data.filter(item => item.name === marketItem.name);

    useEffect(() => {
        setSportKeyLocation(location.pathname)
    }, [location.pathname]);

    return (
        <div className={styles.wrapper}>
            {loading ?
                <div className={styles.container}>
                    <div className={styles.image}>
                        <div className={styles.img_wrapper}>
                            <div className={styles.img_container}>
                                <img src={marketItem?.img} alt="" />
                            </div>
                        </div>
                        <div className={styles.image_buttons}>
                            <Button value="Add to cart"
                                onClick={() => console.log('add to cart')}
                                color="purple"
                                size="medium"
                                iconName="cart"
                                uppercase="none"
                            />
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
                                <p className={styles.type}>{marketItem?.type}</p>
                                <p className={styles.name}>{marketItem?.name}</p>
                            </div>
                            <div className={styles.feature}>
                                <CategoryItem value={marketItem?.rarity} itemRarity={marketItem?.rarity} />
                                <CategoryItem value={marketItem?.type} itemRarity="none" />
                            </div>
                            <div className={styles.category}>
                                <div className={styles.category_item}>
                                    <p className={styles.subtitle}>Category</p>
                                    <p className={styles.title}>{marketItem?.category}</p>
                                </div>
                                <div className={styles.category_item}>
                                    <p className={styles.subtitle}>Wear</p>
                                    <p className={styles.title}>{marketItem?.wearAbbreviated} - {marketItem?.wearFull}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.buy_zone}>
                            {marketItem?.sellerEmail === email ?
                                <div className={styles.buy_zone__warning}>
                                    <p className={styles.warning}>This is your item!</p>
                                </div>
                                :
                                <div className={styles.buy_zone}>
                                    <div className={styles.info}>
                                        <div className={styles.info_container}>
                                            <p className={styles.price}>
                                                {marketItem?.price}$
                                            </p>
                                            <div className={styles.quantity}>
                                                <p>Available Quantity — <span>{marketItem?.amount}</span></p>
                                            </div>
                                        </div>
                                    </div>
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
                                    <Modal activeModal={onActiveModal} setActiveModal={() => setOnActiveModal(true)}>
                                        <p>This feature is currently under development.</p>
                                    </Modal>
                                </div>
                            }
                        </div>
                        <div className={styles.history}>
                            <div className={styles.history_item}>
                                <p className={styles.title}>Appearance history</p>
                                <p className={styles.item_description}>
                                    {marketItem?.appearanceHistory}
                                </p>
                            </div>
                            <div className={styles.history_item}>
                                <p className={styles.title}>Pattern description</p>
                                <p className={styles.item_description}>
                                    {marketItem?.patternDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.similar_items}>
                        <div className={styles.similar_container}>
                            {similarItems.map((item) => {
                                return <Marketitem
                                    // itemsData={data}
                                    buttons={<ItemButton value="Add to cart" />}
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    wearAbbreviated={item.wearAbbreviated}
                                    img={item.img}
                                    price={item.price}
                                    rarity={item.rarity}
                                />
                            })}
                        </div>
                    </div>
                </div>
                :
                <LoadingComponent />
            }
        </div>
    )
}

export default ItemPage;