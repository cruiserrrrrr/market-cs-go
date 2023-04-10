import React from "react";
import Icon from "../Icon";
import styles from './index.module.scss';

interface IButton {
    handler: () => void;
    onClick: (e: any) => void;
    value: string;
    color: string;
    size: string;
    iconName: string;
}

const Button = (props: IButton) => {

    const { handler, value, color, size, iconName,  onClick} = props;

    return (
        <button
            onClick={onClick}
            onChange={handler}
            className={`${styles.wrapper} ${styles[color]} ${styles[size]}`}
        >
            <span >
                <Icon name={iconName} className={styles.btn_icon} />
                {value}
            </span>
        </button>
    )
}

export default Button;