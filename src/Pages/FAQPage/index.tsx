import React, { useEffect, useState } from "react";
import LoadingComponent from "../../Components/LoadingComponent/index";
import FAQTAb from "../../Components/FAQTab/index";
import TabButton from "../../Components/TabButton/index";
import styles from "./index.module.scss";
import { getData } from "../../request/getData";

const FAQPage = () => {

    const [FAQData, setFAQDat] = useState([]);
    const [active, setActive] = useState(Number);
    const [loading, setLoading] = useState(false);

    const getDataItems = async () => {
        try{
            getData(`https://cs-app-database.onrender.com/faqData`, setFAQDat, setLoading)
        }catch(error){
            
        }
    }
    useEffect(() => {
        getDataItems()
    }, [])

    const activeTab = (index) => {
        setActive(index)
    }
    useEffect(() => {
        setActive(1);
    }, [FAQData])
    
    return (
        <div className={styles.faq_wrapper}>
            {
                loading ?
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