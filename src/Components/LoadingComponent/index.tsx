import React from "react";
import styles from "./index.module.scss"
import { Triangle } from 'react-loader-spinner';
import Icon from "../Icon";

const LoadingComponent = () => {
    return (
        <div className={styles.loading_wrapper}>
            <Triangle
                height="280"
                width="280"
                color="#6D6DE4"
                ariaLabel="triangle-loading"
                visible={true}
            />
        </div>
    )
}

export default LoadingComponent;