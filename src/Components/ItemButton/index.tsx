import React from "react";
import Icon from "../Icon";
import styles from "./index.module.scss";

interface IItemButton{
    value: string;
    iconName: string;
}

const ItemButton = (props: IItemButton) => {
    const {value, iconName} = props;

    return(
        <button className={styles.wrapper}>
            <Icon name={iconName}/>
            {value}
        </button>
    )
}

export default ItemButton;