import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ItemButton from "../../Components/ItemButton/index";
import Marketitem from "../../Components/MarketItem/index";
import Button from "../../Components/Button/index";
import styles from "./index.module.scss";
import CategoryItem from "../../Components/CategoryItem/index";
import arrayShuffle from 'array-shuffle';
import LoadingComponent from "../../Components/LoadingComponent/index";
import axios from "axios";

interface IItemPage {

}

const ItemPage = (props: IItemPage) => {

    const { } = props;
    const location = useLocation();
    const { name, id, img, wearAbbreviated, price, rarity, data = [], wearFull, type, category, weaponId, amount } = location.state;
    document.title = name + " (" + wearFull + ")";

    const [itemName, setItemname] = useState('none');
    const [filtredData, setFiltredData] = useState(data);
    const [loading, setLoading] = useState(false);

    const dataProcessing = () => {
        try {
            const timer = setTimeout(() => {
                data
                setLoading(true)
            }, 100);
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        dataProcessing();
    }, []);

    useEffect(() => {
        if (weaponId !== itemName) {
            setFiltredData(data.filter((item) => {
                return item.weaponId === weaponId;
            }))
        } else {
            setFiltredData(data)
        }
    }, [weaponId]);

    filtredData.sort(() => Math.random() - 0.5);

    return (
        <div className={styles.wrapper}>
            {loading ?
                <div className={styles.container}>
                    <div className={styles.image}>
                        <div className={styles.img_wrapper}>
                            <div className={styles.img_container}>
                                <img src={img} alt="" />
                            </div>
                        </div>
                        <div className={styles.image_buttons}>
                            <Button value="Add to cart"
                                handler={() => console.log('add to cart')}
                                color="purple"
                                size="medium"
                                iconName="sett"
                                uppercase="none"
                            />
                            <Button value="Sell a limit"
                                handler={() => console.log('sell a limit')}
                                color="blue"
                                size="medium"
                                iconName="sett"
                                uppercase="none"
                            />
                        </div>
                    </div>
                    <div className={styles.description}>
                        <div className={styles.info}>
                            <div className={styles.name_description}>
                                <p className={styles.type}>{type}</p>
                                <p className={styles.name}>{name}</p>
                            </div>
                            <div className={styles.feature}>
                                <CategoryItem value={rarity} itemRarity={rarity} />
                                <CategoryItem value={type} itemRarity="none" />
                            </div>
                            <div className={styles.category}>
                                <div className={styles.category_item}>
                                    <p className={styles.subtitle}>Category</p>
                                    <p className={styles.title}>{category}</p>
                                </div>
                                <div className={styles.category_item}>
                                    <p className={styles.subtitle}>Wear</p>
                                    <p className={styles.title}>{wearAbbreviated} - {wearFull}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.buy_zone}>
                            <div className={styles.info}>
                                <div className={styles.container}>
                                    <p className={styles.price}>{price}₽</p>
                                    <div className={styles.quantity}>
                                        <p>Available Quantity — <span>{amount}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.button_wrapper}>
                                <Button value="Buy"
                                    handler={() => console.log('buy')}
                                    color="purple"
                                    size="all_width"
                                    iconName="sett"
                                    uppercase="none"
                                />
                                <Button value="Buy by limit"
                                    handler={() => console.log('buy by limit')}
                                    color="blue"
                                    size="all_width"
                                    iconName="sett"
                                    uppercase="none"
                                />
                            </div>
                        </div>
                        <div className={styles.history}>
                            <div className={styles.history_item}>
                                <p className={styles.title}>Appearance history</p>
                                <p className={styles.item_description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sequi itaque alias repellat doloremque? Modi voluptates deserunt magni, neque qui libero sed doloribus cum similique facilis odio ipsam numquam laborum.</p>
                            </div>
                            <div className={styles.history_item}>
                                <p className={styles.title}>Pattern description</p>
                                <p className={styles.item_description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic culpa asperiores similique ut? Quos, tenetur. Ullam eaque at architecto exercitationem quod nobis delectus corporis ducimus voluptatum! Unde fuga necessitatibus sint!</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.similar_items}>
                        <div className={styles.similar_container}>
                            {filtredData.map((item) => {
                                return <Marketitem
                                    itemsData={data}
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
                                />
                            })}
                        </div>
                    </div>
                </div>
                :
                <LoadingComponent />
            }
            <div className={styles.img_blob}>
                <img src={img} alt="" />
            </div>
        </div>
    )
}

export default ItemPage;