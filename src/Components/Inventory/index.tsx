import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import LoadingComponent from "../LoadingComponent";
import Marketitem from "../MarketItem";
import InventoryItem from "../InventoryItem";
import { Link } from "react-router-dom";

interface IInventory {
    expand: () => void;
    tabButtonIndex: number;
    isActive: number;
}

const Inventory = (props: IInventory) => {
    document.title = "User cab"

    const { tabButtonIndex, expand, isActive } = props;

    const [getInventoryItems, setGetInventoryItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isActiveItem, setisActiveItem] = useState(true);
    const [choiceItems, setChoiceItems] = useState(['t1', 't2']);
    const [active, setActive] = useState();


    const dataFetch = async () => {
        try {
            const data = await axios
                .get("https://api.jsonbin.io/v3/b/63fe00feace6f33a22e70225")
                .then(res => {
                    setGetInventoryItems(res.data.record)
                });
            setLoading(true)
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        dataFetch();
    }, []);

    const addItem = (index) => {
        setActive(index);
        const item = {
            name: "test",
        };
        setChoiceItems(current => [...current, 't3']);
        console.log(choiceItems);
        setisActiveItem(!isActiveItem);
    }

    return (
        <div className={isActive === tabButtonIndex ? styles.inventory_wrapper__active : styles.inventory_wrapper}>
            <div className={styles.container}>
                {loading ?
                    <div className={styles.items_container}>
                        {
                            getInventoryItems.map((item) => {
                                return <InventoryItem
                                    index={item.id}
                                    activeItem={active}
                                    // onChange={() => addItem(item.id)}
                                    onClick={() => addItem(item.id)}
                                    buttons={
                                        <Link to={`/item${item.id}`}
                                            state={{
                                                name: item.name,
                                                id: item.id,
                                                img: item.img,
                                                type: item.type,
                                                wearAbbreviated: item.wearAbbreviated,
                                                wearFull: item.wearFull,
                                                price: 0,
                                                amount: item.amount,
                                                rarity: item.rarity,
                                                category: item.category,
                                                weaponId: item.weaponId,
                                                data: item.itemsData,
                                                appearanceHistory: item.appearanceHistory,
                                                patternDescription: item.patternDescription,
                                                linkInGAme: item.linkInGAme
                                            }}>
                                            View in market
                                        </Link>
                                    }
                                    key={item.id}
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
            </div>
            <div>
                {
                    choiceItems.map((element, index) => {
                        return <p key={index}>{element}</p>
                    })
                }
            </div>
        </div>
    )
}

export default Inventory;