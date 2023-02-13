import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";


interface INavitem{
    value: string;
    to: string;
    title: string;
}

const NavItem = (props: INavitem) => {

    const {value, to, title} = props;
    
    const [onExpand, setOnExpand] = useState(true);
    const expand = () => setOnExpand(!onExpand);

    return(
        <li className={styles.item_wrapper}>
            <NavLink title={title} end className={({ isActive }) => isActive ? styles.active_link : styles.link} to={to} onClick={expand}>
                {value}
            </NavLink>
        </li>
    )
}

export default NavItem;