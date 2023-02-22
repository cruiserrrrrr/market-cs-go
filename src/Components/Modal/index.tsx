import React, { useState } from "react";
import Button from "../Button";
import styles from "./index.module.scss";

interface IModal {
    children: any;
    activeModal: boolean;
    setActiveModal: () => void;
}

const Modal = (props: IModal) => {

    const { children, activeModal, setActiveModal } = props;

    return (
        <div className={activeModal ? styles.modal_wrapper : styles.modal_wrapper_active} onClick={setActiveModal}>
            <div className={styles.container} onClick={e => e.stopPropagation()}>
                {children}
                {/* <button onClick={setActiveModal}>click</button> */}
                <Button
                    color="purple"
                    size="small"
                    iconName="close"
                    onClick={setActiveModal}
                />
            </div>
        </div>
    )
}

export default Modal;