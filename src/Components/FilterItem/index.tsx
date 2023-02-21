import React, { useState } from "react";
import Icon from "../Icon";
import styles from "./index.module.scss";

interface IFilterItem {
    value: string;
    iconName: string;
    handler: () => void;
}

const FilterItem = (props: IFilterItem) => {

    const { value, iconName, handler } = props;
    const [checked, setChecked] = useState(false);

    function handleChange() {
        setChecked(!checked);
    }
    return (
        <div className={styles.filteritem_wrapper} onClick={handleChange}>
            <div className={styles.container}>
                <input className={styles.checkbox} type="checkbox" checked={checked} onChange={handler}/>
                <div className={styles.custom_checkbox}></div>
                <label className={styles.item_value}>{value}</label>
            </div>
        </div>
    )
}

export default FilterItem;