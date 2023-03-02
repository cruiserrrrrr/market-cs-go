import React, { useEffect, useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import styles from "./index.module.scss";
import Inventory from "../../Components/Inventory/index";
import OperationsHistory from "../../Components/OperationsHistory";
import PurchaseRequests from "../../Components/PurchaseRequests";
import ItemsForSale from "../../Components/ItemsForSale";
import TabButton from "../../Components/TabButton";
import Icon from "../../Components/Icon/index";

interface IUserCab {

}

const UserCab = (props: IUserCab) => {

    document.title = "User cab"

    const [active, setActive] = useState();

    const activeTab = (index) => {
        setActive(index)
    }
    useEffect(() => {
        setActive(2)
    }, [])

    return (
        <div className={styles.usercab_wrapper}>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.profile_info}>
                        <div className={styles.profile_info}>
                            <div className={styles.profile_icon}>
                                <Icon name="usericon"/>
                            </div>
                            <p className={styles.username}>UserName</p>
                        </div>
                        <div>

                        </div>
                    </div>
                    <ul className={styles.tabs_buttons}>
                        <TabButton isActive={active} expand={() => activeTab(1)} tabButtonIndex={1} value="Purchase Request" />
                        <TabButton isActive={active} expand={() => activeTab(2)} tabButtonIndex={2} value="Inventory" />
                        <TabButton isActive={active} expand={() => activeTab(3)} tabButtonIndex={3} value="Operations History" />
                        <TabButton isActive={active} expand={() => activeTab(4)} tabButtonIndex={4} value="Items for sale" />
                    </ul>
                </div>
                <div className={styles.tabs_container}>
                    <PurchaseRequests isActive={active} expand={() => activeTab(1)} tabButtonIndex={1} />
                    <Inventory isActive={active} expand={() => activeTab(2)} tabButtonIndex={2} />
                    <OperationsHistory isActive={active} expand={() => activeTab(3)} tabButtonIndex={3} />
                    <ItemsForSale isActive={active} expand={() => activeTab(4)} tabButtonIndex={4} />
                </div>
            </div>
        </div>
    )
}

export default UserCab;