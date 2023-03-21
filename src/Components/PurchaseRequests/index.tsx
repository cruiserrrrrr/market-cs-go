import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

interface IPurchaseRequests {
    expand: () => void;
    tabButtonIndex: number;
    isActive: number;
}

const PurchaseRequests = (props: IPurchaseRequests) => {
    document.title = "User cab"

    const { tabButtonIndex, expand, isActive } = props;
    const [loading, setLoading] = useState(false);
    const [dataItems, setDataItems] = useState([]);

    const dataFetch = async () => {
        try {
            const data = await axios
                .get("http://localhost:3030/usersList")
                .then(res => {
                    setDataItems(res.data)
                });
            setLoading(true)
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        dataFetch();
    }, []);


    const inventoryItems = dataItems.find((item) => {
        if (item.userName === "cruiserrrrrr") {
            return item
        }
    })


    return (
        <div className={isActive === tabButtonIndex ? styles.purshase_wrapper__active : styles.purshase_wrapper}>
            <h1>Purchase Requests</h1>
            {/* {
                inventoryItems.map((item, index) => {
                    return <div key={index}>
                        <p>{item.name}</p>
                        <p>{item.id}</p>
                        <p>{item.wearFull}</p>
                    </div>
                })
            } */}
        </div>
    )
}

export default PurchaseRequests;