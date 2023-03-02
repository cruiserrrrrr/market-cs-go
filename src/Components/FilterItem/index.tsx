import React, { useState } from "react";
import Icon from "../Icon";
import styles from "./index.module.scss";

interface IFilterItem {
    value: string;
    onClick: (name: string, value: string) => void;
    title: string;
}

const FilterItem = (props: IFilterItem) => {

    const { value, onClick, title } = props;
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
        onClick(title, value);
    }


    return (
        <div className={styles.filteritem_wrapper}>
            <div className={styles.container} onClick={handleChange}>
                <input className={styles.checkbox} type="checkbox" checked={checked} />
                <div className={styles.custom_checkbox}></div>
                <label className={styles.item_value}>{value}</label>
            </div>
        </div>
    )
}

export default FilterItem;