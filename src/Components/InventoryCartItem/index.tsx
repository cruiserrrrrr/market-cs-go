import React, { useState } from "react";
import Button from "../Button";
import styles from './index.module.scss';

interface IInventoryCartItem {
    name: string;
    price: number;
    img: string;
    onClick: () => void;
}

const InventoryCartItem = (props: IInventoryCartItem) => {

    const { name, price, img, onClick } = props;
    const defaultCommision = (price / 100) * 5;


    const commisionSell = (price) => {
        return price - defaultCommision
    }

    return (
        <div className={styles.item_wrapper}>
            <div className={styles.container}>
                <div className={styles.item_image}>
                    <img className={styles.img} src={img} alt="" />
                </div>
                <div className={styles.item_info}>
                    <p className={styles.name}>{name}</p>
                    <div>
                        <label htmlFor=""></label>
                        <input type="number" placeholder=""/>
                    </div>
                    <div>
                        <p>{price}</p>
                        <p>{(price - defaultCommision).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryCartItem;