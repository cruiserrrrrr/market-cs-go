import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import LoadingComponent from "../LoadingComponent";
import InventoryItem from "../InventoryItem";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import InventoryCart from "../InventoryCart";
import { useAuth } from '../../hooks/useAuth';
import { getData } from "../../request/getData";
import { ALL_ITEMS_MOCK, BASE_URL_MOCK } from "../../constanst/constants";



const Inventory = () => {
    document.title = "Inventory"

    const { email } = useAuth();
    const [loading, setLoading] = useState(false);
    const [choiceItems, setChoiceItems] = useState([]);
    const [isCartActive, setisCartActive] = useState(true);
    const [dataUsers, setDataUsers] = useState([]);

    const getDataItems = async () => {
        try {
            getData('https://634eda1fdf22c2af7b44a30d.mockapi.io/allUsersItemsOnSell', setDataUsers, setLoading)
        } catch (error) {

        }
    }
    useEffect(() => {
        getDataItems()
    }, [])
    const filtersItem = dataUsers.filter(item => item.sellerEmail === email && item.typeItem === "inventory")

    const onActiveCart = () => setisCartActive(!isCartActive)

    const addItem = (value) => {
        setChoiceItems(current => [...current, value]);
    }
    const deleteItem = (value) => {
        setChoiceItems(choiceItems.filter(note => note.id !== value.id))
    }
    const addToCart = (value) => {
        let itemid = choiceItems.filter(item => item.id === value.id);
        if (itemid.length) {
            deleteItem(value)
        } else {
            addItem(value)
        }
    }

    const postCart = () => {
        axios.post(BASE_URL_MOCK + ALL_ITEMS_MOCK, choiceItems)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={styles.inventory_wrapper}>
            <div className={styles.container}>
                {loading ?
                    <div className={styles.items_container}>
                        {
                            filtersItem.map((item) => {
                                return <InventoryItem
                                    key={item.id}
                                    onClick={() => addToCart(item)}
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
                                    price={item.price}
                                />
                            })
                        }
                    </div> :
                    <LoadingComponent />
                }
                <div className={styles.cart} onClick={onActiveCart}>
                    <p className={styles.cart_amount}>{choiceItems.length}</p>
                    <p className={styles.cart_title}>items cart</p>
                </div>
            </div>
            <Modal activeModal={isCartActive} setActiveModal={setisCartActive}>
                {
                    choiceItems.length <= 0 ?
                        <div className={styles.zero_items}>
                            <p>Please choice items for sale</p>
                        </div>
                        :
                        <InventoryCart getDataCart={choiceItems} onClickSend={postCart} />
                }
            </Modal>
        </div>
    )
}

export default Inventory;