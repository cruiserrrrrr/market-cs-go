import React, { useState } from "react";
import styles from "./index.module.scss";

interface IModal {
    children: any;
    activeModal: boolean;
    setActiveModal: () => void;
}

const Modal = (props: IModal) => {

    const { children, activeModal, setActiveModal } = props;
    // const [activeModal, setActiveModal] = useState(false);

    // const onActive = () => {
    //     setActiveModal(true)
    // }

    return (
        <div className={ activeModal ?styles.modal_wrapper : styles.modal_wrapper_active} onClick={setActiveModal}>
            <div className={styles.container}>
                {children}
                <button onClick={setActiveModal}>click</button>
            </div>
        </div>
    )
}

export default Modal;