import React from "react";
import styles from "./index.module.scss";

interface IOperationsHistory {
    expand: () => void;
    tabButtonIndex: number;
    isActive: number;
}

const OperationsHistory = (props: IOperationsHistory) => {
    document.title = "User cab"

    const { tabButtonIndex, expand, isActive } = props;

    return (
        <div className={isActive === tabButtonIndex ? styles.operations_wrapper__active  : styles.operations_wrapper }>
            <h1>Operations History</h1>
        </div>
    )
}

export default OperationsHistory;