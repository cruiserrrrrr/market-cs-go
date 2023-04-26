import React from "react";
import { Oval } from "react-loader-spinner";
import styles from './index.module.scss';

const InfoLoading = () => {
    return (
        <div className={styles.loading_wrapper}>
            <Oval
                height={18}
                width={18}
                color="#6D6DE4"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4c4cdd"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )

}

export default InfoLoading;