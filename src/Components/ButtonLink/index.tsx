import React from "react";
import Icon from "../Icon";
import styles from './index.module.scss';
import { Link } from "react-router-dom";

interface IButton {
    value?: any;
    color?: string;
    size?: string;
    iconName?: string;
    uppercase?: string;
    to?: string;
    onClick?: () => void
}

const ButtonLink = (props: IButton) => {

    const { value='', color='', size='', iconName='', uppercase='', to='', onClick = () => {}} = props;



    return (
        <Link
            to={to}
            className={`${styles.wrapper} ${styles[color]} ${styles[size]} ${styles[uppercase]}`}
            onClick={onClick}
        >
            <span >
                <Icon name={iconName} className={styles.btn_icon} />
                {value}
            </span>
        </Link>
    )
}

export default ButtonLink;