import React from "react";
import styles from "./index.module.scss";

interface IItemsForSale {
    expand: () => void;
    tabButtonIndex: number;
    isActive: number;
}

const ItemsForSale = (props: IItemsForSale) => {
    document.title = "User cab"
    const { tabButtonIndex, expand, isActive } = props;

    return (
        <div className={isActive === tabButtonIndex ? styles.itemsale_wrapper__active : styles.itemsale_wrapper}>
            <h1>Items For Sale</h1>
        </div>
    )
}

export default ItemsForSale;