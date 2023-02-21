import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import Marketitem from "../../Components/MarketItem/index";
import arrayShuffle from 'array-shuffle';
import ItemButton from "../../Components/ItemButton/index";
import DropDownFilter from "../../Components/DropDownFilter/index";
import FilterItem from "../../Components/FilterItem/index";
import axios from "axios";
import LoadingComponent from "../../Components/LoadingComponent/index";
import Modal from "../../Components/Modal/index";


interface IMain {

}

const Main = (props: IMain) => {

    const { } = props;

    document.title = "CS:GO MARKET"

    const [getMarketItems, setGetMarketitems] = useState([]);
    const [loading, setLoading] = useState(false);

    // const [onActiveModal, setOnActiveModal] = useState(true);

    const dataFetch = async () => {
        try {
            const data = await axios
                .get("https://api.jsonbin.io/v3/b/63ebb648ace6f33a22de5fe3")
                .then(res => {
                    setGetMarketitems(res.data.record)
                });
            setLoading(true)
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        dataFetch();
    }, []);

    const shuffled = arrayShuffle(getMarketItems);

    return (
        <div className={styles.wrapper}>
            <div className={styles.items_wrapper}>
                {loading ?
                    <div className={styles.items_container}>
                        {
                            shuffled.map((item) => {
                                return <Marketitem
                                    buttons={<ItemButton iconName="plus" value="Add to cart" />}
                                    itemsData={shuffled}
                                    key={item.id}
                                    name={item.name}
                                    wearAbbreviated={item.wearAbbreviated}
                                    img={item.img}
                                    id={item.id}
                                    price={item.price}
                                    rarity={item.rarity}
                                    type={item.type}
                                    wearFull={item.wearFull}
                                    amount={item.amount}
                                    category={item.category}
                                    weaponId={item.weaponId}
                                />
                            })
                        }
                    </div> :
                    <LoadingComponent />
                }
            </div>
            {/* <Modal activeModal={onActiveModal} setActiveModal={() => setOnActiveModal(true)}>
                <p>test</p>
            </Modal>
            <button onClick={() => setOnActiveModal(false)}>click</button> */}
            <div className={styles.filter}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <p>
                            filter
                        </p>
                    </div>
                    <DropDownFilter title="filter">
                        <FilterItem handler={() => console.log('click')} value="test1" iconName="plus" />
                        <FilterItem handler={() => console.log('click')} value="test1" iconName="plus" />
                        <FilterItem handler={() => console.log('click')} value="test1" iconName="plus" />
                        <FilterItem handler={() => console.log('click')} value="test1" iconName="plus" />
                        <FilterItem handler={() => console.log('click')} value="test1" iconName="plus" />
                        <FilterItem handler={() => console.log('click')} value="test1" iconName="plus" />
                    </DropDownFilter>
                </div>

            </div>

        </div>
    )

}

export default Main;