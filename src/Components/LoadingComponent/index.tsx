import React from "react";
import styles from "./index.module.scss"

const LoadingComponent = () => {
    return(
        <div className={styles.loading_wrapper}>
            <div className={styles.loading_item}></div>
            <div className={styles.loading_item}></div>
            <div className={styles.loading_item}></div>
            <div className={styles.loading_item}></div>
            <div className={styles.loading_item}></div>
            <div className={styles.title}><p>Loading</p></div>
        </div>
    )
}

export default LoadingComponent;