import React, { useEffect, useState } from "react";
import { deleteData, postData } from "../../request/getData";
import { ALL_ITEMS_MOCK, BASE_URL_MOCK, ALL_ITEMS_RENDER, BASE_URL_RENDER } from "../../constanst/constants";
import Button from "../Button";
import InventoryCartItem from "../InventoryCartItem";
import styles from "./index.module.scss";
import InfoLoading from "../InfoLoading";
import Alert from "../Alert";

interface IInventoryCart {
    getDataCart?: object;
    onClick?: () => void;
    name?: string;
    price?: number;
    img?: string;
    typeItem?: string;
    id?: string;
}

const InventoryCart = (props: IInventoryCart) => {

    const { getDataCart = {}, onClick, price, img = '', name = '', } = props;
    const [dataCart, setDataCart] = useState<IInventoryCart>({});
    const [priceValue, setPriceValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [toastShow, setToastShow] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastValue, setToastValue] = useState('');

    useEffect(() => {
        setPriceValue(price)
    }, [price])

    useEffect(() => {
        setDataCart(getDataCart)
    }, [getDataCart])

    const defaultCommision = (priceValue / 100) * 5;
    const endPrice = priceValue - defaultCommision;

    const postCart = (e) => {
        e.preventDefault();
        const postItem = dataCart;
        postItem.price = Number(endPrice.toFixed(2));
        postItem.typeItem = "sell";
        const toastSuccessType = 'success';
        const toastErrorType = 'error';
        const toastSuccessValue = 'The item is up for sale.';
        const toastErrorValue = 'Error selling an item.';

        if (postItem.price <= 0) {
            setToastValue(toastErrorValue)
            setToastType(toastErrorType)
            setToastShow(true)
        } else {
            try {
                deleteData(BASE_URL_MOCK + ALL_ITEMS_MOCK, `/${postItem.id}`, setLoading);
                postItem.id = String(Math.floor(Math.random() * 1000000));
                postData(BASE_URL_MOCK + ALL_ITEMS_MOCK, postItem, setLoading);
                postData(BASE_URL_RENDER + ALL_ITEMS_RENDER, postItem, setLoading);
                setToastValue(toastSuccessValue);
                setToastType(toastSuccessType);
                setToastShow(true);;
            } catch (error) {
                setToastValue(toastErrorValue)
                setToastType(toastErrorType)
                setToastShow(!toastShow)
            }
        }
        // onClick();
        setLoading(false)
    }
    return (
        <div className={styles.inventory_cart}>
            <div className={styles.cart_wrapper}>
                <div className={styles.items_list}>
                    <InventoryCartItem
                        name={name}
                        endPrice={Number(endPrice.toFixed(2))}
                        img={img}
                        value={priceValue || price}
                        onChange={(event) => setPriceValue(event.target.value)}
                    />
                </div>
                <div className={styles.sale_wrapper}>
                    <div className={styles.buttons_continer}>
                        {
                            loading ?
                                <InfoLoading />
                                :
                                <Button
                                    value="Put up for sale"
                                    color="purple"
                                    size="medium"
                                    iconName="none"
                                    onClick={(e) => postCart(e)}
                                />
                        }
                    </div>
                </div>
            </div>
            {toastShow ?
                <Alert
                    type={toastType}
                    value={toastValue}
                    onClick={() => setToastShow(!toastShow)}
                />
                :
                null
            }
        </div>
    )

}

export default InventoryCart;