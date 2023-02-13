import React from "react";
import styles from "./index.module.scss";

interface IItemButton{
    value: string;
}

const ItemButton = (props: IItemButton) => {
    const {value} = props;

    return(
        <button className={styles.wrapper}>
            {value}
        </button>
    )
}

export default ItemButton;