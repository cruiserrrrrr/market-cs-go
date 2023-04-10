import React from "react";
import Icon from "../Icon";
import styles from './index.module.scss';
import { Link } from "react-router-dom";

interface IButton {
    onClick: (e: any) => void;
    value: string;
    color: string;
    size: string;
    iconName: string;
    uppercase: string;
    to: string;
}

const ButtonLink = (props: IButton) => {

    const { value, color, size, iconName, uppercase, onClick, to} = props;



    return (
        <Link
            to={to}
            onClick={onClick}
            className={`${styles.wrapper} ${styles[color]} ${styles[size]} ${styles[uppercase]}`}

        >
            <span >
                <Icon name={iconName} className={styles.btn_icon} />
                {value}
            </span>
        </Link>
    )
}

export default ButtonLink;