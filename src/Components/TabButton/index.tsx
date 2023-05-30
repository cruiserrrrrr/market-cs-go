import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";

interface ITabButton {
    value?: string;
    expand?: () => void;
    tabButtonIndex?: number;
    isActive?: number;
}

const TabButton = (props: ITabButton) => {

    const { value = '', tabButtonIndex = 0, expand = () => '', isActive = 0 } = props;

    return (
        <button className={isActive === tabButtonIndex ? styles.active_button : styles.button} onClick={expand} >
            {value}
        </button>
    )
}

export default TabButton;