import React from "react";
import styles from "./index.module.scss";

interface IFAQTab {
    value?: string;
    tabButtonIndex?: number;
    isActive?: number;
}

const FAQTAb = (props: IFAQTab) => {
    const { value = '', tabButtonIndex = 0, isActive = 0 } = props;

    return (
        <div className={isActive === tabButtonIndex ? styles.tab__active : styles.tab_hidden}>
            <p className={styles.info}>{value}</p>
        </div>
    )
}

export default FAQTAb;