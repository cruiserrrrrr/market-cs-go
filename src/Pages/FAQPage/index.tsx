import axios from "axios";
import React, { useEffect, useState } from "react";
import FAQTAb from "../../Components/FAQTab/index";
import TabButton from "../../Components/TabButton/index";
import styles from "./index.module.scss";

const FAQPage = () => {

    const [FAQData, setFAQDat] = useState([]);
    const [active, setActive] = useState();

    const activeTab = (index) => {
        setActive(index)
    }
    const getFAQData = async () => {
        const data = await axios.get("http://localhost:3030/faqData")
            .then(res => setFAQDat(res.data))
    }

    useEffect(() => {
        getFAQData();
        setActive(1);
    }, [])
    console.log(FAQData)
    return (
        <div className={styles.faq_wrapper}>
            <div className={styles.faq_container}>
                <div className={styles.questions}>
                    {
                        FAQData.map((item, index) => {
                            return <TabButton key={item.id} isActive={active} expand={() => activeTab(index)} tabButtonIndex={index} value={item.title} />
                        })
                    }
                </div>
                <div className={styles.answers}>
                    {
                        FAQData.map((item, index) => {
                            return <FAQTAb key={item.id} isActive={active} expand={() => activeTab(index)} tabButtonIndex={index} value={item.information}/>
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default FAQPage;