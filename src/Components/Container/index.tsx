import React from "react";
import styles from "./index.module.scss";

interface ICointainer{
    children: any;
}

const Container = (props: ICointainer) => {
    const {children} = props;
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Container;