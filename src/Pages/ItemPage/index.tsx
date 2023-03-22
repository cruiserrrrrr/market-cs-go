import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ItemButton from "../../Components/ItemButton/index";
import Marketitem from "../../Components/MarketItem/index";
import Button from "../../Components/Button/index";
import styles from "./index.module.scss";
import CategoryItem from "../../Components/CategoryItem/index";
import arrayShuffle from 'array-shuffle';
import LoadingComponent from "../../Components/LoadingComponent/index";
import axios from "axios";
import Modal from "../../Components/Modal/index";


interface IItemPage {

}
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
}

const ItemPage = (props: IItemPage) => {

    document.title = "CS:GO MARKET";
    const { } = props;
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [statusBuy, setStatusBuy] = useState(0);
    const [onActiveModal, setOnActiveModal] = useState(true);
    const [similarItems, setSimilarItems] = useState([]);
    const [marketItem, setMamketItem] = useState<IItem>();

    const dataFetch = async () => {
        try {
            const data = await axios
                .get(`http://localhost:3030/allItemsOnSell/${id}`)
                .then(res => {
                    setMamketItem(res.data)
                });
            setLoading(true)
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        dataFetch()
    }, []);

    const getSimilarItems = async () => {
        const data = await axios
            .get("http://localhost:3030/allItemsOnSell")
            .then(res => {
                setSimilarItems(res.data)
            });
    }

    useEffect(() => {
        getSimilarItems();
        similarItems.filter(item => {
            if (item.name === marketItem.name) {
                return item
            }
        })
    }, [marketItem]);

    const CHAT_ID = -1001866746317;
    const TOKEN = "5851306296:AAFrPni6Ahnn8yG27fjhnsn5VnlZnjPHanY";
    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const postDataTelegram = () => {
        let message = `<b>Purchase made!</b>\n`;
        message += `<b>Skin: </b> ${marketItem.name} (${marketItem.wearFull})\n`;
        message += `<b>By price: </b> ${marketItem.price}$\n`;
        message += `<b>Thanks!</b>`;
        axios.post(URL, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div className={styles.wrapper}>
            {loading ?
                <div className={styles.container}>
                    <div className={styles.image}>
                        <div className={styles.img_wrapper}>
                            <div className={styles.img_container}>
                                <img src={marketItem.img} alt="" />
                            </div>
                        </div>
                        <div className={styles.image_buttons}>
                            <Button value="Add to cart"
                                handler={() => console.log('add to cart')}
                                color="purple"
                                size="medium"
                                iconName="cart"
                                uppercase="none"
                            />
                            {/* <Button value="View in game"
                                handler={() => testHref}
                                color="blue"
                                size="medium"
                                iconName="monitor"
                                uppercase="none"
                                href={linkInGAme}
                            /> */}
                            <a href={marketItem.linkInGAme}>View in game</a>
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
                            {/* if user id === sellers user id, show warning block */}
                            {statusBuy < marketItem.price ?
                                <div className={styles.buy_zone}>
                                    <div className={styles.info}>
                                        <div className={styles.container}>
                                            <p className={styles.price}>
                                                {marketItem.price}$
                                            </p>
                                            <div className={styles.quantity}>
                                                <p>Available Quantity — <span>{marketItem.amount}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.button_wrapper}>
                                        <Button value="Buy"
                                            onClick={postDataTelegram}
                                            color="purple"
                                            size="all_width"
                                            iconName="fire"
                                            uppercase="none"
                                        />
                                        <Button value="Buy by limit"
                                            handler={() => console.log()}
                                            color="blue"
                                            size="all_width"
                                            iconName="limit"
                                            uppercase="none"
                                            onClick={() => setOnActiveModal(false)}
                                        />
                                    </div>
                                    <Modal activeModal={onActiveModal} setActiveModal={() => setOnActiveModal(true)}>
                                        <p>test </p>
                                    </Modal>
                                </div>
                                :
                                <div className={styles.buy_zone__warning}>
                                    <p className={styles.warning}>This is your item!</p>
                                </div>
                            }
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
                            {similarItems.map((item) => {
                                return <Marketitem
                                    // itemsData={data}
                                    buttons={<ItemButton iconName="plus" value="Add to cart" />}
                                    key={item.id}
                                    name={item.name}
                                    wearAbbreviated={item.wearAbbreviated}
                                    img={item.img}
                                    id={item.id}
                                    price={item.price}
                                    rarity={item.rarity}
                                    type={item.type}
                                    wearFull={item.wearFull}
                                    amount={item.amount}
                                    category={item.category}
                                    weaponId={item.weaponId}
                                    appearanceHistory={item.appearanceHistory}
                                    patternDescription={item.patternDescription}
                                    linkInGAme={item.linkInGAme}
                                />
                            })}
                        </div>
                    </div>
                </div>
                :
                <LoadingComponent />
            }
            {/* <div className={styles.img_blob}>
                <img src={img} alt="" />
            </div> */}
        </div>
    )
}

export default ItemPage;