import React from "react";
import styles from "./index.module.scss"
import { ProgressBar } from 'react-loader-spinner';
import Icon from "../Icon";

const LoadingComponent = () => {

    return (
        <div className={styles.loading_wrapper}>
            <ProgressBar
                height="80"
                // width="400"
                borderColor='#546BFF'
                barColor='#6555FA'
                ariaLabel="progress-bar-loading"
                visible={true}
            />
        </div>
    )
}

export default LoadingComponent;