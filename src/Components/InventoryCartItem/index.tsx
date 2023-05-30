import React, { useEffect, useState } from "react";
import CustomInput from "../CustomInput";
import styles from './index.module.scss';

interface IInventoryCartItem {
    name?: string;
    img?: string;
    onChange?: (event) => void;
    value?: number;
    endPrice?: number
}

const InventoryCartItem = (props: IInventoryCartItem) => {

    const { name = '', img = '', onChange, value, endPrice = 0 } = props;

    return (
        <div className={styles.item_wrapper}>
            <div className={styles.container}>
                <div className={styles.item_image}>
                    <img className={styles.img} src={img} alt="" />
                </div>
                <div className={styles.item_info}>
                    <p className={styles.name}>{name}</p>
                    <div>
                        <CustomInput value={value} type="number" placeholder="item price" onChange={onChange} />
                    </div>
                    <div>
                        {
                            endPrice <= 0 ?
                                <p>{0}$</p>
                                :
                                <p>{endPrice}$</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryCartItem;