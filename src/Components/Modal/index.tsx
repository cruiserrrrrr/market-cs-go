import React from "react";
import Button from "../Button";
import styles from "./index.module.scss";

interface IModal {
    children: any;
    activeModal: boolean;
    setActiveModal: any;
}

const Modal = (props: IModal) => {

    const { children, activeModal, setActiveModal } = props;

    return (
        <div className={activeModal ? styles.modal_wrapper : styles.modal_wrapper_active} onClick={setActiveModal}>
            <div className={styles.container} onClick={e => e.stopPropagation()}>
                {children}
                <div className={styles.button_pos}>
                    <Button
                        color="purple"
                        size="small"
                        iconName="close"
                        onClick={setActiveModal}
                    />
                </div>
            </div>
        </div>
    )
}

export default Modal;