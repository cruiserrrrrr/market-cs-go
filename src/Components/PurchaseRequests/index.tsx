import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { getDatabase, ref, onValue } from "firebase/database";
import Marketitem from "../MarketItem";
import LoadingComponent from "../LoadingComponent";
import Button from "../Button";
import ItemButton from "../ItemButton";
import { useAuth } from '../../hooks/useAuth';




const PurchaseRequests = () => {
    
    document.title = "User cab";
    const { email } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userItemsSell, setUserItemsSell] = useState([]);
    const [dataFireBase, setDataFireBase] = useState([]);

    const db = getDatabase();
    const dbRef = ref(db, 'usersList');

    useEffect(() => {
        try {
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                setDataFireBase(data)
                setLoading(true)
            });
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        setUserItemsSell(userItemsSell)
    }, [userItemsSell])

    useEffect(() => {
        dataFireBase.filter((item) => {
            if (item.email === email) {
                return setUserItemsSell(item.userItemsSell)
            }
        })
    }, [dataFireBase])

    return (
        <div className={styles.purshase_wrapper}>
            {/* <div className={styles.purshase_wrapper__active}> */}
            <h1>Purchase Requests</h1>
            {loading ?
                <div className={styles.items_wrapper}>
                    {
                        userItemsSell.map((item, index) => (
                            <Marketitem
                                buttons={<ItemButton value="Remove from sale" onClick={() => console.log('Remove from sale')} />}
                                // itemsData={filtredData}
                                key={item.id + index}
                                id={item.id}
                                name={item.name}
                                wearAbbreviated={item.wearAbbreviated}
                                img={item.img}
                                price={item.price}
                                rarity={item.rarity}
                            />
                        ))
                    }
                </div>
                :
                <LoadingComponent />
            }
        </div>
    )
}

export default PurchaseRequests;