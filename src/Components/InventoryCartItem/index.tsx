import React, { useState } from "react";
import CustomInput from "../CustomInput";
import styles from './index.module.scss';

interface IInventoryCartItem {
    name: string;
    price: number;
    img: string;
    onClick: () => void;
    onChange: (event) => void;
    value: number;
}

const InventoryCartItem = (props: IInventoryCartItem) => {

    const { name, price, img, onClick, onChange, value } = props;
    const defaultCommision = (price/100) * 5;
    const [totalCost, setTotalCost] = useState();
    const [priceValue, setPriceValue] = useState(price)

    const commisionSell = (price) => {
        return setTotalCost(price)
    }

    const endPrice = priceValue - defaultCommision;
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
                        <CustomInput value={Number(priceValue).toFixed(2)} type="number" placeholder="item price" onChange={(event) => setPriceValue(event.target.value)}/>
                    </div>
                    <div>
                        <p>{endPrice.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryCartItem;