import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from './index.module.scss';

interface IMarketItem {
    name: string;
    id: string;
    img: string;
    type: string;
    wearAbbreviated: string;
    wearFull: string;
    price: string;
    amount: string;
    rarity: any;
    weaponId: string;
    category: string;
    buttons: any;

}

const Marketitem = (props: IMarketItem) => {
    const { name, img, wearAbbreviated, price, id, buttons, rarity, type, wearFull, amount, category, weaponId } = props;

    return (
        <div className={`${styles.item_wrapper}`}>
            <div className={`${styles.container} ${styles[rarity]}`}>
                <div className={styles.dropdown}>
                    {buttons}
                </div>
                <Link title={name}
                    to={`/item${id}`}
                    state={{
                        name: name,
                        id: id,
                        img: img,
                        type: type,
                        wearAbbreviated: wearAbbreviated,
                        wearFull: wearFull,
                        price: price,
                        amount: amount,
                        rarity: rarity,
                        category: category,
                        weaponId: weaponId,
                    }}
                >
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
        </div>
    )
}
export default Marketitem;