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
                </div>
            </Link>
        </div>
    )
}
export default Marketitem;