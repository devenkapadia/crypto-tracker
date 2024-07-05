import { Box, LinearProgress, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import styled from '@emotion/styled';
import { numberWithCommas } from '../components/CoinTable';
import ReactHtmlParser from "react-html-parser";
import CoinInfo from '../components/CoinInfo';

const CustomBox = styled(Box)`
  display: flex;
  background-color:#2D3250;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;
const CustomBox2 = styled(Box)`
  width: 30%;
  @media (max-width: 960px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  border-right: 2px solid grey;
`;

const CustomBox3 = styled(Box)`
  align-self: start;
  padding: 25px;
  padding-top: 10px;
  width: 100%;
  @media (max-width: 960px) {
    display: flex;
    justify-content: space-around;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 400px) {
    align-items: start;
  }
`;

const CustomTypography = styled(Typography)`
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
  font-family: Madimi One;
`;

const CustomHeading = styled(Typography)`
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
  font-family: Madimi One;
`
const CustomDesc = styled(Typography)`
  width: 80%;
  font-family: Madimi One;
  padding: 0px;
  color: #fff;
  padding-bottom: 15px;
  padding-top: 0;
  text-align: justify;  
`


const CoinPage = () => {
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const { id } = useParams();
  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      console.log(data);
      setCoin(data);
    }

    fetchCoin();
  }, [currency, id]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <CustomBox>
      <CustomBox2>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height='200'
          style={{ marginBottom: 20 }}
        />
        <CustomTypography variant='h3'>
          {coin?.name}
        </CustomTypography>
        <CustomDesc variant='subtitle1'>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </CustomDesc>
        <CustomBox3>
          <span style={{ display: 'flex' }}>
            <CustomHeading variant='h5'>
              Rank:
            </CustomHeading>
            &nbsp;
            &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Madimi One", color: 'white' }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <CustomHeading variant='h5'>
              Current Price:
            </CustomHeading>
            &nbsp;
            &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Madimi One", color: 'white' }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <CustomHeading variant='h5'>
              Market Cap:
            </CustomHeading>
            &nbsp;
            &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Madimi One", color: 'white' }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </CustomBox3>
      </CustomBox2>
      <CoinInfo coin={coin} />
    </CustomBox>
  )
}

export default CoinPage
