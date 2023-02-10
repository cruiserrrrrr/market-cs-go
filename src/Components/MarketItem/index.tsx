import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from './index.module.scss';

interface IMarketItem{

}

const Marketitem = (props: IMarketItem) => {
    const {} = props;

    return(
        <div className={styles.item_wrapper}>
            <div className={styles.dropdown}>
                <p>asd</p>
            </div>
            <div className={styles.content}>
                <p>asd</p>
            </div>
            <div className={styles.info}>
                <p>asd</p>
            </div>
        </div>
    )
}
export default Marketitem;