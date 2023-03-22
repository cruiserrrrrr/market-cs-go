import React from "react";
import styles from "./index.module.scss";

interface IFAQTab {
    value: string;
    expand: () => void;
    tabButtonIndex: number;
    isActive: number;
}

const FAQTAb = (props: IFAQTab) => {
    const { value, expand, tabButtonIndex, isActive } = props;
    
    return (
        <div className={isActive === tabButtonIndex ? styles.tab__active : styles.tab_hidden}>
            <p>{value}</p>
        </div>
    )
}

export default FAQTAb;