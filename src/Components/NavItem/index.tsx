import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";
import styles from "./index.module.scss";


interface INavitem {
    value: string;
    to: string;
    title: string;
    onClick: () => void;
}

const NavItem = (props: INavitem) => {

    const { value, to, title, onClick } = props;

    const [onExpand, setOnExpand] = useState(true);
    const expand = () => setOnExpand(!onExpand);

    return (
        <li className={styles.item_wrapper}>
            <NavLink title={title} end className={({ isActive }) => isActive ? styles.active_link : styles.link} to={to} onChange={expand} onClick={onClick}>
                {value}
            </NavLink>
        </li>
    )
}

export default NavItem;