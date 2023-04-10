import React from "react";
import Icon from "../Icon";
import styles from "./index.module.scss";

interface IItemButton{
    value: string;
    onClick: () => void;
}

const ItemButton = (props: IItemButton) => {
    const {value, onClick} = props;

    return(
        <button className={styles.wrapper} onClick={onClick}>
            {value}
        </button>
    )
}

export default ItemButton;