import React from "react";
import Icon from "../Icon";
import styles from './index.module.scss';

interface IButton {
    onClick?: (e: any) => void;
    value?: string;
    color?: string;
    size?: string;
    iconName?: string;
    uppercase?: string;
}

const Button = (props: IButton) => {

    const { value = '', color = '', size = '', iconName = '', uppercase = '', onClick = () => { } } = props;



    return (
        <button
            onClick={onClick}
            className={`${styles.wrapper} ${styles[color]} ${styles[size]} ${styles[uppercase]}`}

        >
            <span >
                <Icon name={iconName} className={styles.btn_icon} />
                {value}
            </span>
        </button>
    )
}

export default Button;