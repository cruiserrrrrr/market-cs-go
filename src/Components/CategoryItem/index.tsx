import React from "react";
import styles from "./index.module.scss";

interface ICategoryItem{
    value: string;
    itemRarity: string;
}

const CategoryItem = (props: ICategoryItem) => {

    const {value, itemRarity} = props;

    return(
        <div className={`${styles.category_item} ${styles[itemRarity]}`}>
            <p>{value}</p>
        </div>
    )
}

export default CategoryItem;