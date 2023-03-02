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
import filtersData from "../../Components/filters.json"

interface IMain {

}

const Main = (props: IMain) => {

    const { } = props;

    document.title = "CS:GO MARKET"

    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ rarity: [], wearFull: [], type: [] });
    
    const [filtredData, setFiltredData] = useState([]);
    
    const dataFetch = async () => {
        try {
            const data = await axios
                .get("https://api.npoint.io/f563c815fc2a6c62889f")
                .then(res => {
                    setFiltredData(arrayShuffle(res.data))
                });
            setLoading(true)
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        dataFetch();
    }, []);

    useEffect(() => {
        filtredData.map((item) => {
            console.log(item)
        })
    }, [filters]);

    const filterHandler = (name, value) => {
        const arrCategory = filters[name];
        const index = arrCategory.indexOf(value);
        let result;

        if (index >= 0) {
            result = arrCategory.filter(item => item !== value)
        } else {
            result = [...arrCategory, value];
        }
        setFilters({ ...filters, [name]: result });
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.items_wrapper}>
                {loading ?
                    <div className={styles.items_container}>
                        {
                            filtredData.map((item) => {
                                return <Marketitem
                                    buttons={<ItemButton iconName="plus" value="Add to cart" />}
                                    itemsData={filtredData}
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
            <div className={styles.filter}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <p>
                            filter
                        </p>
                    </div>
                    <DropDownFilter title="rarity">
                        {filtersData.rarity.map((element, index) => (
                            <FilterItem onClick={filterHandler} value={element} key={element + index} title="rarity" />
                        ))}
                    </DropDownFilter>
                    <DropDownFilter title="wearFull">
                        {filtersData.wearFull.map((element, index) => (
                            <FilterItem onClick={filterHandler} value={element} key={element + index} title="wearFull" />
                        ))}
                    </DropDownFilter>
                    <DropDownFilter title="type">
                        {filtersData.type.map((element, index) => (
                            <FilterItem onClick={filterHandler} value={element} key={element + index} title="type" />
                        ))}
                    </DropDownFilter>
                </div>
            </div>
        </div>
    )

}

export default Main;