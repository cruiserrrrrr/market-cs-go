import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss';
import Marketitem from "../../Components/MarketItem/index";
import ItemButton from "../../Components/ItemButton/index";
import DropDownFilter from "../../Components/DropDownFilter/index";
import FilterItem from "../../Components/FilterItem/index";
import LoadingComponent from "../../Components/LoadingComponent/index";
import filtersData from "../../allData/filters.json"
import qs from 'qs';
import Button from "../../Components/Button";
import { getData } from "../../request/getData";
import array from '../../api.json'

const Main = () => {


    document.title = "CS:GO MARKET"

    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ rarity: [], wearFull: [], type: [] });
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filtredData, setFiltredData] = useState([]);
    const [filterActive, setFilterActive] = useState(true);
    const [dataItems, setDataItems] = useState([]);
    const [loadItems, setLoadItem] = useState(150);

    useEffect(() => {
        setLoadItem(loadItems)
    }, [loadItems])

    const getDataItems = async () => {
        getData(`https://cs-app-database.onrender.com/allItemsOnSell?_limit=${loadItems}`, setDataItems, setLoading)
    }

    const loadmore = (event) => {
        event.preventDefault();
        setLoadItem(loadItems + 25);
        getDataItems()
    }

    useEffect(() => {
        getDataItems();
    }, [])

    useEffect(() => {
        setDataItems
    }, [])


    useEffect(() => {
        setFilters
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
        setFiltredData(dataItems)
    }, [dataItems])

    useEffect(() => {
        const filtersLength = Object.values(filters).filter((item) => {
            return item.length
        }).length;
        if (filtersLength) {
            const filterType = dataItems.filter((item) => {
                if (filtersLength === Object.keys(filters).filter((filterItem) => (
                    filters[filterItem].includes(item[filterItem])
                )).length) {
                    return item
                }
            })
            return setFiltredData(filterType)
        } else {
            setFiltredData(dataItems)
        }

    }, [filters]);
    const isFilterActive = () => setFilterActive(!filterActive);

    return (
        <div className={styles.wrapper}>
            <div className={styles.items_wrapper}>
                {dataItems.length > 0 ?
                    <div className={styles.items_container}>
                        {
                            filtredData.length === 0 ?
                                <div className={styles.data_err}>
                                    <p>
                                        No matching items.
                                    </p>
                                </div>
                                :
                                filtredData.map((item, index) => {
                                    return <Marketitem
                                        buttons={<ItemButton value="Add to cart" onClick={() => console.log('Add to cart')} />}
                                        key={item.id + index}
                                        name={item.name}
                                        wearAbbreviated={item.wearAbbreviated}
                                        img={item.img}
                                        id={item.id}
                                        price={item.price}
                                        rarity={item.rarity}
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
            <div className={styles.on_filter}>
                <Button iconName="limit" color="purple" size="icon_only" onClick={isFilterActive} />
            </div>
            {
                window.innerWidth > 768 ?
                    <></>
                    :
                    <div className={filterActive ? styles.filter_mobile_hidden : styles.filter_mobile_active} onClick={isFilterActive}>
                        <div className={styles.filter_mobile} onClick={e => e.stopPropagation()}>
                            <div className={styles.filter_mobile_container}>
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
            }
        </div >
    )

}

export default Main;