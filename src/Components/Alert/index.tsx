import React from "react";
import styles from './index.module.scss';

interface IAlert {
    value: string;
    type: string;
    isActive: boolean;
    onClick: () => void;
}

const Alert = (props: IAlert) => {

    const { value, type, isActive, onClick } = props;


    return (
        <div className={`${styles.toast_wrapper} ${styles[type]}`} onClick={onClick}>
            <p>{value}</p>
        </div>
    )
}

export default Alert;
