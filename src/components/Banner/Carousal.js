import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';

const CustomLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    color: white;
`;

const CarousalBox = styled(Box)`    
    height: 50%;
    display: flex;
    align-items: center;
`;


const Carousal = () => {
    const { currency, symbol } = CryptoState();
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const fetchTrendingCoins = async () => {
            const { data } = await axios.get(TrendingCoins(currency))
            // console.log(data);
            setTrending(data)
        }
        fetchTrendingCoins();
    }, [currency]);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0
        return (
            <CustomLink to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                    }}>
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </CustomLink>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    };

    return (
        <CarousalBox>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
            />

        </CarousalBox>
    )
}

export default Carousal
