import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../../Components/Button/index";
import CustomInput from "../../Components/CustomInput/index";
import styles from './index.module.scss';



interface IRegisterPage {

}

const RegisterPage = (props: IRegisterPage) => {

    const { } = props;
    const [usersDataFetch, setUsersDataFetch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nameUser, setNameUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');

    const dataFetch = async () => {
        try {
            const data = await axios
                .get("http://localhost:3030/usersList")
                .then(res => {
                    setUsersDataFetch(res.data)
                });
            setLoading(true)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        // usersDataFetch;
        dataFetch();
    }, [])


    const logIn = (e) => {
        e.preventDefault();

        let info = {
            "userName": nameUser,
            "userPassword": passwordUser
        };

        const search = usersDataFetch.filter(item => {
            if ((item.userName === info.userName) && (item.userPassword === info.userPassword)) {
                return console.log(item)
            } else {
                return console.log(false)
            }
        })

        // console.log(usersDataFetch.find(useCallback(isUserInfo)))

    }
    // const [nameItem, setNameItem] = useState('');
    // const [imgItem, setImgItem] = useState('');
    // const [priceItem, setPriceItem] = useState(Number);
    // const [amountItem, setAmountItem] = useState(Number);
    // const [rarityItem, setRarityItem] = useState('');
    // const [wearFullItem, setWearFullItem] = useState('');
    // const [linkInGAmeItem, setLinkInGAmeItem] = useState('');
    // const [wearAbbreviatedItem, setWearAbbreviatedItem] = useState('');
    // const [appearanceHistoryItem, setAppearanceHistoryItem] = useState('');
    // const [patternDescriptionItem, setPatternDescriptionItem] = useState('');


    // const addItem = (e) => {
    //     e.preventDefault();
    //     let info = {
    //         "id": Math.floor(Math.random() * 100),
    //         "img": imgItem,
    //         "name": nameItem,
    //         "type": "rifle",
    //         "price": priceItem,
    //         "amount": amountItem,
    //         "rarity": rarityItem,
    //         "category": "common",
    //         "weaponId": 12,
    //         "wearFull": wearFullItem,
    //         "linkInGAme": linkInGAmeItem,
    //         "wearAbbreviated": wearAbbreviatedItem,
    //         "appearanceHistory": appearanceHistoryItem,
    //         "patternDescription": patternDescriptionItem
    //     };
    //     axios.post(`http://localhost:3030/allItemsOnSell`, {
    //         "id": (((1+Math.random())*0x10000)|0).toString(16).substring(1),
    //         "img": imgItem,
    //         "name": nameItem,
    //         "type": "pistol",
    //         "price": priceItem,
    //         "amount": amountItem,
    //         "rarity": rarityItem,
    //         "category": "common",
    //         "weaponId": 5,
    //         "wearFull": wearFullItem,
    //         "linkInGAme": linkInGAmeItem,
    //         "wearAbbreviated": wearAbbreviatedItem,
    //         "appearanceHistory": appearanceHistoryItem,
    //         "patternDescription": patternDescriptionItem
    //     })
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //         })
    // }

    return (
        <div className={styles.register_wrapper}>
            <div className={styles.register_container}>
                <h2>Login form.</h2>
                <form className={styles.register_form}>

                    <CustomInput placeholder="name" type="text" value={nameUser} onChange={(event) => setNameUser(event.target.value)} />
                    <CustomInput placeholder="pass" type="password" value={passwordUser} onChange={(event) => setPasswordUser(event.target.value)} />
                    {/* <CustomInput placeholder="img" type="text" value={imgItem} onChange={(event) => setImgItem(event.target.value)} />
                    <CustomInput placeholder="name" type="text" value={nameItem} onChange={(event) => setNameItem(event.target.value)} />
                    <CustomInput placeholder="price" type="number" value={priceItem} onChange={(event) => setPriceItem(event.target.value)} />
                    <CustomInput placeholder="amount" type="number" value={amountItem} onChange={(event) => setAmountItem(event.target.value)} />
                    <CustomInput placeholder="rarity" type="text" value={rarityItem} onChange={(event) => setRarityItem(event.target.value)} />
                    <CustomInput placeholder="wearFull" type="text" value={wearFullItem} onChange={(event) => setWearFullItem(event.target.value)} />
                    <CustomInput placeholder="linkInGAme" type="text" value={linkInGAmeItem} onChange={(event) => setLinkInGAmeItem(event.target.value)} />
                    <CustomInput placeholder="wearAbbreviated" type="text" value={wearAbbreviatedItem} onChange={(event) => setWearAbbreviatedItem(event.target.value)} />
                    <CustomInput placeholder="appearanceHistory" type="text" value={appearanceHistoryItem} onChange={(event) => setAppearanceHistoryItem(event.target.value)} />
                    <CustomInput placeholder="patternDescription" type="text" value={patternDescriptionItem} onChange={(event) => setPatternDescriptionItem(event.target.value)} /> */}
                    <div className={styles.messege}>
                        <Button
                            value="add item"
                            color="purple"
                            size="medium"
                            onClick={logIn}
                            iconName="monitor"
                        />
                    </div>
                </form>
                {/* <iframe frameborder="0" allowfullscreen width="1520" height="955" src="https://goodgame.ru/player?166994"></iframe>
                <iframe frameborder="0" allowfullscreen width="400" height="955" src="https://goodgame.ru/chat/ToToToToToTo/"></iframe> */}
            </div>
        </div>
    )
}

export default RegisterPage;