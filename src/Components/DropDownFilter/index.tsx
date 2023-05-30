import React, { useState } from "react";
import Icon from "../Icon";
import styles from "./index.module.scss";

interface IDropDownFilter {
    children?: any;
    title?: string;
}

const DropDownFilter = (props: IDropDownFilter) => {

    const { children, title = '' } = props;

    const [dropDownActive, setDropDownActive] = useState(true);
    const onActive = () => setDropDownActive(!dropDownActive);
    return (
        <div className={styles.dropdown_wrapper} >
            <div className={styles.header} onClick={onActive}>
                <p>{title}</p>
                <Icon name="triangle" className={dropDownActive ? styles.icon : styles.icon_active} />
            </div>
            <div className={dropDownActive ? styles.container : styles.container_active}>
                {children}
            </div>
        </div >
    )
}

export default DropDownFilter;