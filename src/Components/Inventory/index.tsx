import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import LoadingComponent from "../LoadingComponent";
import Marketitem from "../MarketItem";
import InventoryItem from "../InventoryItem";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import InventoryCart from "../InventoryCart";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useAuth } from '../../hooks/useAuth';




const Inventory = () => {
    document.title = "User cab"

    const { email } = useAuth();
    const [loading, setLoading] = useState(false);
    const [choiceItems, setChoiceItems] = useState([]);
    const [isCartActive, setisCartActive] = useState(true);
    const [userInventory, setUserInventory] = useState([]);
    const [userInfo, setUserInfo] = useState()

    const [dataUsers, setDataUsers] = useState([]);
    const getDataItems = async () => {
        await axios.get(`https://api.npoint.io/f563c815fc2a6c62889f/usersList`)
            .then(res => {
                setDataUsers(res.data);
            })
        setLoading(true)
    }
    useEffect(() => {
        getDataItems()
    }, [])

    useEffect(() => {
        dataUsers.filter((item) => {
            if (item.email === email) {
                setUserInventory(item.userItemsInventoryList)
                setUserInfo(item)
            }
        })
    }, [dataUsers])

    useEffect(() => {
        setUserInventory(userInventory)
    }, [userInventory])

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

        let item = {
            id: "b79d634f-51d9-40b8-b489-c4539a51asd3dd",
            img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j3KqnUjlRd4cJ5nqfC9Inz3VHtrRJrNmj6d4XEdlBqZw7R-VTqxr-6hJS-uJjAm3FnsnQi-z-DyGAd0sdD",
            name: "USP-S | Cyrex",
            type: "pistols",
            price: 121.99,
            amount: 39,
            rarity: "restricted",
            category: "common",
            weaponId: 5,
            wearFull: "Field-Tested",
            linkInGAme: "steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20M4319554305323658803A29170484908D10110164371447953705",
            wearAbbreviated: "FT",
            appearanceHistory: "USP-S | Cyrex was added to the game on November 28, 2016, as part of The Glove Collection, which was released alongside the “Brothers In Arms” update. The skin was created by Nextgenz #Prisma2.",
            patternDescription: "The design of the skin is made in a futuristic style. The black body of the pistol is adorned with stripes and various geometric shapes made in red and white. The design is complemented with white inscriptions and a small icon of a counter-terrorist. The lower part of the slide and the trigger guard are painted solid white."

        };
        axios.post(`https://api.jsonbin.io/v3/b/642c9e41ebd26539d0a4960b`, { item })
            .then(res => {
                console.log(res.data.recod);
            })
            .catch(error => console.log(error))
        // console.log('post card')
    }


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
                                                id: item.id,
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
                        <InventoryCart getDataCart={choiceItems} onClickSend={postCart} />
                }
            </Modal>
        </div>
    )
}

export default Inventory;