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
    uppercase: string;
    href: string;
}

const Button = (props: IButton) => {

    const { handler, value, color, size, iconName, uppercase, onClick, href } = props;



    return (
        <button
            onClick={onClick}
            onChange={handler}
            className={`${styles.wrapper} ${styles[color]} ${styles[size]} ${styles[uppercase]}`}

        >
            <span href={href}>
                <Icon name={iconName} className={styles.btn_icon} />
                {value}
            </span>
        </button>
    )
}

export default Button;