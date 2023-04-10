import React from "react";
import styles from './index.module.scss';

interface IBaseToast {
    value: string;
    type: string;
    isActive: boolean;
    onClick: () => void;
}

const BaseToast = (props: IBaseToast) => {

    const { value, type, isActive, onClick } = props;


    return (
        <div className={`${styles.toast_wrapper} ${styles[type]}`} onClick={onClick}>
            <p>{value}</p>
        </div>
    )
}

export default BaseToast;
