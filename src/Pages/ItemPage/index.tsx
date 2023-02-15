import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ItemButton from "../../Components/ItemButton/index";
import Marketitem from "../../Components/MarketItem/index";
import Button from "../../Components/Button/index";
import styles from "./index.module.scss";

interface IItemPage {

}

// , id, img, type, wearAbbreviated, wearFull, price, amount, rarity, category, weaponId
const ItemPage = (props: IItemPage) => {

    const { } = props;

    const location = useLocation();
    const { name, id, img, wearAbbreviated, price, rarity, data, wearFull } = location.state;

    const [itemId, setItemId] = useState(id);
    const [filtredData, setFiltredData] = useState(data);

    document.title = name + " (" + wearFull + ")";

    // useEffect(() => {
    //     if (itemId !== id) {
    //         setFiltredData(data.filter((item) => {
    //             return item.id === itemId;
    //         }))
    //     } else {
    //         setFiltredData(data)
    //     }
    // }, [id]);

    return (
        <div className={styles.wrapper}>
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
                    {price}
                    {rarity}
                </div>
                <div className={styles.similar_items}>
                    {/* {data.map((item) => {
                        return <Marketitem
                            itemsData={data}
                            buttons={<ItemButton value="Add to cart" />}
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
                    })} */}
                </div>
                {/* {name}
                {id}
                <img src={img} alt="" />
                {wearAbbreviated}
                {price}
                {rarity} */}
            </div>
            <div className={styles.img_blob}>
                <img src={img} alt="" />
            </div>
        </div>
    )
}

export default ItemPage;