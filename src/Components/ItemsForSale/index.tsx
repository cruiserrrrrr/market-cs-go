import React from "react";
import styles from "./index.module.scss";


const ItemsForSale = () => {

    document.title = "User cab";

    return (
        <div className={styles.itemsale_wrapper}>
            <h1>Items For Sale</h1>
        </div>
    )
}

export default ItemsForSale;