import React from "react";
import styles from './index.module.scss';

interface IBanalceItem {
    title?: string;
    image?: string;
    onClick?: () => void;
}

const BalanceItem = (props: IBanalceItem) => {
    const { title = 'Balance', image = 'Option', onClick = () => { } } = props;
    return (
        <div className={styles.item_wrapper} onClick={onClick}>
            <div className={styles.image_wrapper}>
                <img src={image} alt={title} className={styles.img} />
                <div className={styles.title}>
                    <p>{title}</p>
                </div>
            </div>
        </div>
    )
}

export default BalanceItem;