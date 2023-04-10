import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";
import styles from "./index.module.scss";


interface INavitem {
    value: string;
    to: string;
    title: string;
    onClick: () => void;
    iconName: string;
    iconClass: string;
    sizeIcon: string;
}

const NavItem = (props: INavitem) => {

    const { value, to, title, onClick, iconName, iconClass, sizeIcon } = props;

    const [onExpand, setOnExpand] = useState(true);
    const expand = () => setOnExpand(!onExpand);

    return (
        <li className={styles.item_wrapper}>
            <NavLink title={title} end className={({ isActive }) => isActive ? styles.active_link : styles.link} to={to} onChange={expand} onClick={onClick}>
                {/* <Icon name={iconName} className={`${iconClass} ${styles[sizeIcon]}`} /> */}
                {value}
            </NavLink>
        </li>
    )
}

export default NavItem;