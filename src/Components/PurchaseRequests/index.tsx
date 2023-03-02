import React from "react";
import styles from "./index.module.scss";

interface IPurchaseRequests {
    expand: () => void;
    tabButtonIndex: number;
    isActive: number;
}

const PurchaseRequests = (props: IPurchaseRequests) => {
    document.title = "User cab"
    
    const { tabButtonIndex, expand, isActive } = props;

    return (
        <div className={isActive === tabButtonIndex ? styles.purshase_wrapper__active : styles.purshase_wrapper}>
            <h1>Purchase Requests</h1>
        </div>
    )
}

export default PurchaseRequests;