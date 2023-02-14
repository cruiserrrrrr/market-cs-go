import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import Marketitem from "../../Components/MarketItem/index";
import arrayShuffle from 'array-shuffle';
import ItemButton from "../../Components/ItemButton/index";


interface IMain {

}

const Main = (props: IMain) => {

    const { } = props;

    const [getMarketItems, setGetMarketitems] = useState([]);
    const dataFetch = async () => {
        const data = await (
            await fetch(
                "https://634eda1fdf22c2af7b44a30d.mockapi.io/testovoe"
                // "https://api.jsonbin.io/v3/b/63ebb648ace6f33a22de5fe3"
            )
        ).json();
        setGetMarketitems(data);
    };
    useEffect(() => {
        dataFetch();
    }, []);

    const shuffled = arrayShuffle(getMarketItems);
    console.log(shuffled)
    return (
        <div className={styles.wrapper}>
            <div className={styles.items_wrapper}>
                <div className={styles.items_container}>
                    {shuffled.map((item) => {
                        return <Marketitem
                            buttons={<ItemButton value="Add to cart" />}
                            key={item.id}
                            name={item.name}
                            wearAbbreviated={item.wearAbbreviated}
                            img={item.img}
                            id={item.id}
                            price={item.price}
                            rarity={item.rarity}
                        />
                    })}
                </div>
            </div>
        </div>
    )

}

export default Main;