import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Marketitem from "../MarketItem";
import LoadingComponent from "../LoadingComponent";
import ItemButton from "../ItemButton";
import { useAuth } from '../../hooks/useAuth';
import { deleteData, editData, getData, postData } from "../../request/getData";
import { BASE_URL_RENDER, ALL_ITEMS_RENDER, BASE_URL_MOCK, ALL_ITEMS_MOCK } from '../../constanst/constants';
import PurchaseItems from "../PurchaseItems";
import axios from "axios";
import Modal from "../Modal";
import Button from "../Button";



const PurchaseRequests = () => {

    document.title = "User cab";
    const { email } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userItemsSellRender, setUserItemsSellRender] = useState([]);
    const [userItemsSellMock, setUserItemsSellMock] = useState([]);
    const [openModal, setOpenModal] = useState(true);
    const [preItem, setPreItem] = useState({});

    const getItems = async () => {
        try {
            // getData(BASE_URL_RENDER + ALL_ITEMS_RENDER, setUserItemsSellRender, setLoading);
            // getData(BASE_URL_MOCK + ALL_ITEMS_MOCK, setUserItemsSellMock, setLoading);
            await axios.get(BASE_URL_MOCK + ALL_ITEMS_MOCK)
                .then(res => {
                    setUserItemsSellMock(res.data);
                    setLoading(true)
                });
        } catch (e) {
            console.log(e)
        }
    }

    // const unitedItems = userItemsSellRender.concat(userItemsSellMock);
    const userItems = userItemsSellMock.filter(item => item.sellerEmail === email && item.typeItem === "sell");


    const preRemoveItem = (item) => {
        setOpenModal(!openModal);
        setPreItem(item)
    };
    const removeFromSell = ( item) => {
        // e.preventDefault();
        // getItems(true);
        item.typeItem = "inventory";
        try {
            editData(BASE_URL_MOCK + ALL_ITEMS_MOCK + '/', `${item.id}`, item, setLoading);
            getItems(true);
            // userItems.filter(obj => obj.id != item.id);
            // deleteData(BASE_URL_MOCK + ALL_ITEMS_MOCK + '/', `${item.id}`, setLoading);
            // item.id = Math.floor(Math.random() * 1000000);
            // postData(BASE_URL_MOCK + ALL_ITEMS_MOCK, item, setLoading);
        } catch (error) {

        }
        console.log(preItem)
    }
    useEffect(() => {
        getItems()
    }, [])
    return (
        <div className={styles.purshase_wrapper}>
            <h2>Purchase Requests</h2>
            <div className={styles.container}>
                {loading ?
                    <>
                        {userItems.length <= 0 ?
                            <div className={styles.zero_items}>
                                <p>You have no items for sale.</p>
                            </div>
                            :
                            // <PurchaseItems itemsList={userItems} update={() => removeFromSell()} />
                            <div className={styles.items_container}>
                                {userItems.map((item, index) => (
                                    <Marketitem
                                        buttons={<ItemButton value="Remove from sale" onClick={() => preRemoveItem(item)} />}
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
                            </div>
                        }
                    </>
                    :
                    <LoadingComponent />
                }
            </div>
            <Modal activeModal={openModal} setActiveModal={setOpenModal}>
                <div className={styles.remove_modal}>
                    <p>Are you sure you want to take the item off the market?</p>
                    <div className={styles.buttons_container}>
                        <Button
                            color="purple"
                            size="medium"
                            value="No"
                            iconName="close"
                            onClick={() => setOpenModal(!openModal)}

                        />
                        <Button
                            color="border"
                            size="medium"
                            value="Yes"
                            iconName="check_mark"
                            onClick={() => removeFromSell(preItem)}

                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default PurchaseRequests;