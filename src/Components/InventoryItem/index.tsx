import React, { useState } from "react";
import styles from './index.module.scss';

interface IInventoryItem {
    name: string;
    img: string;
    wearAbbreviated: string;
    price: number;
    buttons: JSX.Element;
    onClick: () => void;
}

const InventoryItem = (props: IInventoryItem) => {

    const {onClick, name, img, wearAbbreviated, price, buttons } = props;

    const [isActive, setIsActive] = useState(true);
    const onActive = () => setIsActive(!isActive);

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