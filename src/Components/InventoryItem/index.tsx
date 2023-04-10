import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from './index.module.scss';

interface IInventoryItem {
    name: string;
    id: number;
    img: string;
    type: string;
    wearAbbreviated: string;
    wearFull: string;
    price: number;
    amount: number;
    weaponId: number;
    category: string;
    buttons: JSX.Element;
    itemsData: any;
    appearanceHistory: string;
    patternDescription: string;
    linkInGAme: string;
    onChange: () => void;
    onClick: () => void;
    activeItem: any;
    index: number;
}

const InventoryItem = (props: IInventoryItem) => {

    const { index, activeItem, onClick, name, img,
        wearAbbreviated, price, id, buttons,
        type, wearFull, amount, category, weaponId,
        itemsData, appearanceHistory, patternDescription,
        linkInGAme, onChange } = props;

    const [isActive, setIsActive] = useState(true);
    const onActive = () => setIsActive(!isActive);
    // const activeItem = () => {
    //     // setIsActive(!isActive);
    //     {onClick};
    // };


    return (
        <div className={isActive ? styles.item_wrapper : styles.item_wrapper__active} onClick={onActive}>
            <div className={`${styles.container}`} onClick={onClick}>
                <div className={styles.dropdown_wrapper}>
                    <div className={styles.dropdown}>
                        {buttons}
                    </div>
                </div>
                <div className={styles.item_info}>
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
                </div>
            </div>
        </div>
    )
}
export default InventoryItem;