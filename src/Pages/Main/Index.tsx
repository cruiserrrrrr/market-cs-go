import React from "react";
import Container from "../../Components/Container/index";
import Button from "../../Components/Button/index";
import styles from './index.module.scss';
import Header from "../../Components/Header/Index";
import Marketitem from "../../Components/MarketItem/index";

interface IMain {

}

const Main = (props: IMain) => {

    const { } = props;

    return (
        <div className={styles.wrapper}>
            <Container>
                <Button iconName="burger" size="medium" value="test" color="purple" handler={() => console.log('click')} uppercase="no" />
                <Marketitem/>
            </Container>
        </div>
    )

}

export default Main;