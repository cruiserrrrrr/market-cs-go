import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from './index.module.scss';

interface IMarketItem {
    name: string;
    id: string;
    img: string;
    wearAbbreviated: string;
    price: number;
    rarity: any;
    buttons: JSX.Element;
}

const Marketitem = (props: IMarketItem) => {
    const { name, img, wearAbbreviated, price, id, buttons, rarity} = props;

    return (
        <div className={`${styles.item_wrapper}`}>
            <div className={`${styles.container} ${styles[rarity]}`}>
                <div className={styles.dropdown_wrapper}>
                    <div className={styles.dropdown}>
                        {buttons}
                    </div>
                </div>
                <Link title={name}
                    to={`/item/${id}`}
                    state={{
                        id: id,
                    }}
                >
                    <div className={styles.content}>
                        <div className={styles.image}>
                            <img src={img} alt={name} />
                        </div>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.wear}>{wearAbbreviated}</p>
                        <p className={styles.price}>{price}$</p>
                        <p className={styles.name}>{name}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Marketitem;