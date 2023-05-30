import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import LoadingComponent from "../LoadingComponent";
import InventoryItem from "../InventoryItem";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import InventoryCart from "../InventoryCart";
import { useAuth } from '../../hooks/useAuth';
import { deleteData, postData, getData } from "../../request/getData";
import { ALL_ITEMS_MOCK, BASE_URL_MOCK, ALL_ITEMS_RENDER, BASE_URL_RENDER } from "../../constanst/constants";



const Inventory = () => {
    document.title = "Inventory"

    const { email } = useAuth();
    const [loading, setLoading] = useState(false);
    const [choiceItems, setChoiceItems] = useState([]);
    const [isCartActive, setisCartActive] = useState(true);
    const [dataUsers, setDataUsers] = useState([]);
    const [presellItem, setPresellItem] = useState(Object);

    const getDataItems = async () => {
        try {
            getData(BASE_URL_MOCK + ALL_ITEMS_MOCK, setDataUsers, setLoading)
        } catch (error) {

        }
    }
    useEffect(() => {
        getDataItems()
    }, [])
    const filtersItem = dataUsers.filter(item => item.sellerEmail === email && item.typeItem === "inventory");

    // const onActiveCart = () => setisCartActive(!isCartActive)

    // const addItem = (value) => {
    //     setChoiceItems(current => [...current, value]);
    // }
    // const deleteItem = (value) => {
    //     setChoiceItems(choiceItems.filter(note => note.id !== value.id))
    // }
    // const addToCart = (value) => {
    //     let itemid = choiceItems.filter(item => item.id === value.id);
    //     if (itemid.length) {
    //         deleteItem(value)
    //     } else {
    //         addItem(value)
    //     }
    // }
    const preSell = (value) => {
        setisCartActive(!isCartActive)
        setPresellItem(value)
    }

    const closePresellWindow = () => setisCartActive(!isCartActive)
    

    return (
        <div className={styles.inventory_wrapper}>
            <div className={styles.container}>
                {loading ?
                    <>
                        {
                            filtersItem.length <= 0 ?
                                <div className={styles.zero_items}>
                                    <p>You don't have items.</p>
                                </div>
                                :
                                <div className={styles.items_container}>
                                    {
                                        filtersItem.map((item) => (
                                            <InventoryItem
                                                key={item.id}
                                                // onClick={() => addToCart(item)}
                                                onClick={() => preSell(item)}
                                                buttons={
                                                    <Link
                                                        to={`/item/${item.id}`}
                                                        state={{
                                                            id: item.id,
                                                        }}
                                                    >
                                                        View in market
                                                    </Link>
                                                }
                                                name={item.name}
                                                wearAbbreviated={item.wearAbbreviated}
                                                img={item.img}
                                                price={item.price.toFixed(2)}
                                            />
                                        ))
                                    }
                                </div>
                        }
                    </>
                    :
                    <LoadingComponent />
                }
            </div>
            <Modal activeModal={isCartActive} setActiveModal={setisCartActive}>
                <InventoryCart
                    onClick={closePresellWindow}
                    getDataCart={presellItem}
                    name={presellItem.name}
                    price={presellItem.price}
                    img={presellItem.img}
                />
            </Modal>
        </div>
    )
}

export default Inventory;