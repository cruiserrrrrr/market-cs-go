import React, { useEffect, useState } from "react";
import Button from "../Button";
import InventoryCartItem from "../InventoryCartItem";
import styles from "./index.module.scss";

interface IInventoryCart {
    getDataCart: Array;
    onClickSend: (event: any) => void;
}

const InventoryCart = (props: IInventoryCart) => {

    const { getDataCart, onClickSend } = props;
    const [dataCart, setDataCart] = useState(getDataCart)
    const [priceValue, setPriceValue] = useState()

    const deleteAllItems = () => {
        dataCart.lenght = 0
    }

    useEffect(() => {
        setDataCart(getDataCart)
    },[getDataCart])
    console.log(dataCart)
    
    return (
        <div className={styles.inventory_cart}>
            <div className={styles.cart_wrapper}>
                <div className={styles.items_list}>
                    {dataCart.map((item, index) => {
                        return (
                            <InventoryCartItem
                                key={index}
                                name={item.name}
                                price={item.price}
                                img={item.img}
                                value={priceValue}
                            // onClick={}
                            />
                        )
                    })}
                </div>
                <div className={styles.sale_wrapper}>
                    <div className={styles.buttons_continer}>
                        <Button value="Delete all items" color="border" size="medium" iconName="none" onClick={deleteAllItems}/>
                        <Button value="Put up for sale" color="purple" size="medium" iconName="none" onClick={onClickSend}/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default InventoryCart;