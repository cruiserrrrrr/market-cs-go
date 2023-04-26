import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Marketitem from "../MarketItem";
import LoadingComponent from "../LoadingComponent";
import ItemButton from "../ItemButton";
import { useAuth } from '../../hooks/useAuth';
import { getData } from "../../request/getData";




const PurchaseRequests = () => {
    
    document.title = "User cab";
    const { email } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userItemsSell, setUserItemsSell] = useState([]);
    
    const getItems = async () => {
        try {
            getData('https://634eda1fdf22c2af7b44a30d.mockapi.io/allUsersItemsOnSell', setUserItemsSell, setLoading)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getItems()
    },[])

    const filteredItems = userItemsSell.filter(item => item.sellerEmail === email && item.typeItem === "sell")

    return (
        <div className={styles.purshase_wrapper}>
            <h1>Purchase Requests</h1>
            {loading ?
                <div className={styles.items_wrapper}>
                    {
                        filteredItems.map((item, index) => (
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