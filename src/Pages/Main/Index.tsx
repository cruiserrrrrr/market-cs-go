import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import Marketitem from "../../Components/MarketItem/index";
import arrayShuffle from 'array-shuffle';


interface IMain {

}

const Main = (props: IMain) => {

    const { } = props;

    const [getMarketItems, setGetMarketitems] = useState([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    "https://634eda1fdf22c2af7b44a30d.mockapi.io/testovoe"
                )
            ).json();
            setGetMarketitems(data);
        };
        dataFetch();
    }, []);

    const shuffled = arrayShuffle(getMarketItems);

    return (
        <div className={styles.wrapper}>
            <div className={styles.items_container}>
                {shuffled.map((item) => {
                    return <Marketitem
                        key={item.id}
                        name={item.name}
                        wearAbbreviated={item.wearAbbreviated}
                        img={item.img}
                        id={item.id}
                        price={item.price}
                    />
                })}
            </div>
        </div>
    )

}

export default Main;