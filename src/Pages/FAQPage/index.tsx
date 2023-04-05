import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../../Components/LoadingComponent/index";
import FAQTAb from "../../Components/FAQTab/index";
import TabButton from "../../Components/TabButton/index";
import styles from "./index.module.scss";
import { getDatabase, ref, onValue } from "firebase/database";

const FAQPage = () => {

    const [FAQData, setFAQDat] = useState([]);
    const [active, setActive] = useState();
    const [loading, setLoading] = useState(false);
    const [dataItems, setDataItems] = useState([]);
    const [data, setData] = useState(dataItems);

    // const db = getDatabase();
    // const dbRef = ref(db, 'faqData');

    const getDataItems = async () => {
        await axios.get(`https://api.npoint.io/f563c815fc2a6c62889f/allItemsOnSell`)
            .then(res => {
                setDataItems(res.data);
            })
    }
    useEffect(() => {
        getDataItems()
    }, [])

    // useEffect(() => {
    //     try {
    //         onValue(dbRef, (snapshot) => {
    //             const data = snapshot.val();
    //             setFAQDat(data)
    //             setLoading(true)
    //         });
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [])
    const activeTab = (index) => {
        setActive(index)
    }
    useEffect(() => {
        setData(FAQData);
        setActive(1);
    }, [FAQData])

    return (
        <div className={styles.faq_wrapper}>
            {
                loading ?
                    <div className={styles.faq_container}>
                        <div className={styles.questions}>
                            {
                                data.map((item, index) => {
                                    return <TabButton key={item.id} isActive={active} expand={() => activeTab(index)} tabButtonIndex={index} value={item.title} />
                                })
                            }
                        </div>
                        <div className={styles.answers}>
                            {
                                data.map((item, index) => {
                                    return <FAQTAb key={item.id} isActive={active} expand={() => activeTab(index)} tabButtonIndex={index} value={item.information} />
                                })
                            }
                        </div>
                    </div>
                    :
                    <LoadingComponent />
            }
        </div >
    )
}

export default FAQPage;