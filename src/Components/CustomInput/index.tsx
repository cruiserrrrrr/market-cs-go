import React from "react";
import styles from './index.module.scss';

interface ICustomInput {
    placeholder: string;
    type: string;
    onChange: (event) => void;
    value: string;
}

const CustomInput = (props: ICustomInput) => {

    const { placeholder, type, onChange, value } = props;

    return <input
        className={styles.custom_input}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
    />

}

export default CustomInput;