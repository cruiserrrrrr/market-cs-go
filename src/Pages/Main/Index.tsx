import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss';
import Marketitem from "../../Components/MarketItem/index";
import arrayShuffle from 'array-shuffle';
import ItemButton from "../../Components/ItemButton/index";
import DropDownFilter from "../../Components/DropDownFilter/index";
import FilterItem from "../../Components/FilterItem/index";
import axios from "axios";
import LoadingComponent from "../../Components/LoadingComponent/index";
import Modal from "../../Components/Modal/index";
import filtersData from "../../allData/filters.json"
import qs from 'qs';

interface IMain {

}

const Main = (props: IMain) => {

    const { } = props;

    document.title = "CS:GO MARKET"

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({ rarity: [], wearFull: [], type: [] });
    const [filtredData, setFiltredData] = useState([]);
    const navigate = useNavigate();


    const dataFetch = async () => {
        try {
            const data = await axios
                .get("http://localhost:3030/allItemsOnSell")
                .then(res => {
                    setData(arrayShuffle(res.data))
                    setFiltredData(arrayShuffle(res.data))
                });
            setLoading(true)
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        setFilters;
        dataFetch();
    }, []);


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

        const queryString = qs.stringify({
            sortProperty: filters
        })
        navigate(`?${queryString}`)
    }

    useEffect(() => {
        setFiltredData(data)
    }, [])

    useEffect(() => {
        const filtersLength = Object.values(filters).filter((item) => {
            return item.length
        }).length;
        if (filtersLength) {
            const filterType = data.filter((item) => {
                if (filtersLength === Object.keys(filters).filter((filterItem) => (
                    filters[filterItem].includes(item[filterItem])
                )).length) {
                    return item
                }
            })
            return setFiltredData(filterType)
        } else {
            setFiltredData(data)
        }

    }, [filters]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.items_wrapper}>
                {loading ?
                    <div className={styles.items_container}>
                        {
                            filtredData.length <= 0 ?
                                <div className={styles.data_err}>
                                    <p>
                                        No matching items.
                                    </p>
                                </div>
                                :
                                filtredData.map((item, index) => {
                                    return <Marketitem
                                        buttons={<ItemButton iconName="plus" value="Add to cart" />}
                                        // itemsData={filtredData}
                                        key={item.id + index}
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
                    <DropDownFilter title="type">
                        {filtersData.type.map((element, index) => (
                            <FilterItem onClick={filterHandler} value={element} key={element + index} title="type" />
                        ))}
                    </DropDownFilter>
                    <DropDownFilter title="wearFull">
                        {filtersData.wearFull.map((element, index) => (
                            <FilterItem onClick={filterHandler} value={element} key={element + index} title="wearFull" />
                        ))}
                    </DropDownFilter>
                    <DropDownFilter title="rarity">
                        {filtersData.rarity.map((element, index) => (
                            <FilterItem onClick={filterHandler} value={element} key={element + index} title="rarity" />
                        ))}
                    </DropDownFilter>
                </div>
            </div>
        </div>
    )

}

export default Main;