import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import Marketitem from "../MarketItem";
import ItemButton from "../ItemButton";
import { BASE_URL_MOCK, ALL_ITEMS_MOCK } from "../../constanst/constants";
import { editData, deleteData, postData } from "../../request/getData";
import Modal from "../Modal";

interface IPurchaseItems {
    itemsList?: Array;
    update: (e) => void;
}

const PurchaseItems = (props: IPurchaseItems) => {

    const { itemsList = [], update = () => { } } = props;
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(itemsList)
    }, [itemsList])

    const removeFromSell = (item) => {
        // e.preventDefault();
        item.typeItem = "inventory";
        try {
            // editData(BASE_URL_MOCK + ALL_ITEMS_MOCK + '/', `${item.id}`, item, setLoading);
            deleteData(BASE_URL_MOCK + ALL_ITEMS_MOCK + '/', `${item.id}`, setLoading);
            item.id = Math.floor(Math.random() * 1000000);
            postData(BASE_URL_MOCK + ALL_ITEMS_MOCK, item, setLoading);
            console.log(itemsList, 'itemsList')
        } catch (error) {

        }
        update;
    }
    return (
        <div className={styles.items_container}>
            {items.map((item, index) => (
                <Marketitem
                    buttons={<ItemButton value="Remove from sale" onClick={() => removeFromSell(item)} />}
                    // itemsData={filtredData}
                    key={item.id + index}
                    id={item.id}
                    name={item.name}
                    wearAbbreviated={item.wearAbbreviated}
                    img={item.img}
                    price={item.price}
                    rarity={item.rarity}
                />
            ))}
            <Modal activeModal={} setActiveModal={}>
                
            </Modal>
        </div>
    )
}

export default PurchaseItems;