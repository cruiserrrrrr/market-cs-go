import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import LoadingComponent from "../LoadingComponent";
import Marketitem from "../MarketItem";
import InventoryItem from "../InventoryItem";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import InventoryCart from "../InventoryCart";
import { getDatabase, ref, onValue } from "firebase/database";
import { useAuth } from '../../hooks/useAuth';




const Inventory = () => {
    document.title = "User cab"

    const { email } = useAuth();
    const [getInventoryItems, setGetInventoryItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [choiceItems, setChoiceItems] = useState([]);
    const [isCartActive, setisCartActive] = useState(true);
    const [dataItems, setDataItems] = useState([]);
    const [userInventory, setUserInventory] = useState([]);
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
        setUserInventory(userInventory)
    },[userInventory])

    useEffect(() => {
        dataFireBase.filter((item) => {
            if (item.email === email) {
                return setUserInventory(item.userItemsInventoryList)
            }
        })
    }, [dataFireBase])

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

    const postCart = (event) => {
        event.preventDefault();
        const postData = choiceItems.forEach(item => axios.post(`https://634eda1fdf22c2af7b44a30d.mockapi.io/userPurchaseItems`, item)
            .then(res => {
                console.log(res);
                console.log(res.data);
            }));
        const deleteChoiceItems = choiceItems.forEach(item => axios.delete('https://api.jsonbin.io/v3/b/63fe00feace6f33a22e70225', item)
            .then(res => {
                console.log(res);
                console.log(res.data);
            }))
    }

    const inventoryItems = getInventoryItems.find((item) => {
        if (item.email === "cruiser@gmail.com") {
            return item
        }
    })

    return (
        <div className={styles.inventory_wrapper}>
        {/* <div className={styles.inventory_wrapper__active}> */}
            <div className={styles.container}>
                {loading ?
                    <div className={styles.items_container}>
                        {
                            userInventory.map((item, index) => {
                                return <InventoryItem
                                    key={index}
                                    onClick={() => addToCart(item)}
                                    buttons={
                                        <Link to={`/item/${item.id}`}
                                            state={{
                                                // name: item.name,
                                                id: item.id,
                                                // img: item.img,
                                                // type: item.type,
                                                // wearAbbreviated: item.wearAbbreviated,
                                                // wearFull: item.wearFull,
                                                // price: 0,
                                                // amount: item.amount,
                                                // rarity: item.rarity,
                                                // category: item.category,
                                                // weaponId: item.weaponId,
                                                // data: item.itemsData,
                                                // appearanceHistory: item.appearanceHistory,
                                                // patternDescription: item.patternDescription,
                                                // linkInGAme: item.linkInGAme
                                            }}>
                                            View in market
                                        </Link>
                                    }
                                    name={item.name}
                                    wearAbbreviated={item.wearAbbreviated}
                                    img={item.img}
                                    id={item.id}
                                    price={item.price}
                                    type={item.type}
                                    wearFull={item.wearFull}
                                    amount={item.amount}
                                    category={item.category}
                                    weaponId={item.weaponId}
                                    appearanceHistory={item.appearanceHistory}
                                    patternDescription={item.patternDescription}
                                    linkInGAme={item.linkInGAme}
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
            {/* <Button value="Close" size="small" color="purple" onClick={onActiveCart} /> */}
            <Modal activeModal={isCartActive} setActiveModal={setisCartActive}>
                {
                    choiceItems.length <= 0 ?
                        <div className={styles.zero_items}>
                            <p>Please choice items for sale</p>
                        </div>
                        :
                        <InventoryCart dataCart={choiceItems} onClickSend={postCart} />
                }
            </Modal>
        </div>
    )
}

export default Inventory;