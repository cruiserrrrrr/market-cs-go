import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from './index.module.scss';

interface IMarketItem {
    name: string;
    id: string;
    img: string;
    // type: string;
    wearAbbreviated: string;
    // wearFull: string;
    price: string;
    // amount: string;
    // rarity: string;
    // weaponId: string;
    // category: string; 

}

const Marketitem = (props: IMarketItem) => {
    const {name, img, wearAbbreviated, price, id } = props;

    return (
        <div className={styles.item_wrapper}>
            <div className={styles.dropdown}>
                <p>add to cart</p>
            </div>
            <Link to={`/item${id}`}>
                <div className={styles.content}>
                    <div className={styles.image}>
                        <img src={img} alt={name} />
                    </div>
                </div>
                <div className={styles.info}>
                    <p className={styles.wear}>{wearAbbreviated}</p>
                    <p className={styles.price}>{price}₽</p>
                    <p className={styles.name}>{name}</p>
                    {/* "name": "AK-47 | Wild Lotus",
                    "id": "1",
                    "img": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJL_9C3moS0kfv7IbrdqWdY781lteXA54vwxgXn-0A5ZG-nJNeSdVdsYF7Uq1W4kOm-18e57c_InSEy7CFztiqImUepwUYbUpyroPk",
                    "type": "rifle",
                    "wearAbbreviated": "FN",
                    "wearFull": "Factory New",
                    "price": "759 765.88",
                    "amount": "1",
                    "rarity": "covert",
                    "category": "common",
                    "weaponId": "1 */}
                </div>
            </Link>
        </div>
    )
}
export default Marketitem;