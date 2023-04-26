import React from "react";
import styles from './index.module.scss';

interface IToggle {
    checked: boolean,
    onToggled: () => void,
}

const Toggle = (props: IToggle) => {

    const { onToggled, checked } = props;

    return (
        <label className={styles.toggle_wrapper}>
            <input className={styles.toggle_checkbox} type="checkbox" checked={checked} onChange={onToggled} />
            <span className={styles.toggle_slider} />
        </label>
    )
}

export default Toggle;