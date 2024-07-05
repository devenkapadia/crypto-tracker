import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import axios from 'axios';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';


const CustomBox = styled(Box)`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    padding: 40px;

    @media (max-width: 400px) {
        width: 100%;
        margin-top: 0;
        padding: 20px;
        padding-top: 0;
    }
`

const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency, symbol } = CryptoState();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        console.log(days);
        const fetchHistoricData = async () => {
            const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
            setFlag(true);
            console.log(data.prices);
            setHistoricData(data.prices);
        };
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coin.id, currency, days])

    const formattedData = historicData
        ? historicData.map((coin) => {
            const date = new Date(coin[0]);
            const timestamp = days === 1
                ? `${date.getHours() % 12 || 12}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`
                : date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            return {
                timestamp,
                value: coin[1].toFixed(2),
            };
        })
        : [];

    return (
        <CustomBox>
            {!historicData | flag === false ? (
                <CircularProgress
                    style={{ color: 'gold' }}
                    size={250}
                    thickness={1}
                />
            ) : (
                <>
                    {historicData && <LineChart width={800} height={500} data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                        <XAxis dataKey="timestamp" tick={null} />
                        <YAxis />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={1} dot={{ radius: 0 }} />
                        <Tooltip formatter={(value) => [`${symbol} ${value}`]} />
                    </LineChart>}
                    <div
                        style={{
                            display: "flex",
                            marginTop: 20,
                            justifyContent: "space-around",
                            width: "100%",
                        }}
                    >
                        {chartDays.map((day) => (
                            <SelectButton
                                key={day.value}
                                onClick={() => {
                                    setDays(day.value);
                                    setFlag(false);
                                }}
                                selected={day.value === days}
                            >
                                {day.label}
                            </SelectButton>
                        ))}
                    </div>
                </>
            )}
        </CustomBox>
    )
}

export default CoinInfo
