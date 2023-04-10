import React from 'react';
import styles from './index.module.scss';

const Banners = () => {

    document.title = "Todos it Simple"

    return (
        <div className={styles.banners_wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <p>here you can record your todos.</p>
                </div>
            </div>
        </div>

    )
}

export default Banners;