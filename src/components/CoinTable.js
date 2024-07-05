import { Box, Container, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { CryptoState } from '../CryptoContext';
import { CoinList } from '../config/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomBox = styled(Box)`
    background-color: #3354cc;
    padding-top: 10px
`;

const CustomTableRow = styled(TableRow)`
    background-color: #91coff;
    cursor: pointer;
    font-family: Madimi One;

    &:hover {
    background-color: #2D3250;
    }
`;
const CustomPagination = styled(Pagination)`
    .MuiPaginationItem-root {
        color: white;
    }
    .Mui-selected {
        background-color: white;
        color: black;
    }
`

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinTable = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState([]);
    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true);
            const { data } = await axios.get(CoinList(currency));

            // console.log(data);
            setCoins(data);
            setLoading(false);
        }

        fetchCoins();
    }, [currency])

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };

    return (
        <CustomBox>
            <Container style={{ textAlign: 'center' }}>
                <Typography variant='h4' style={{ margin: 18, fontFamily: "Madimi One", color: "#fff" }}>
                    Market Prices of Crypto Currencies
                </Typography>
                <TextField
                    label="Search For a Crypto Currency.."
                    variant="filled"
                    style={{ marginBottom: 20, width: "100%", backgroundColor: "#fff" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer component={Paper}>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: 'gold' }} />
                    ) : (
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#2D3748" }}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "#fff",
                                                fontWeight: "600",
                                                fontFamily: "Madimi One"
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <CustomTableRow
                                                onClick={() => navigate(`/coins/${row.id}`)}
                                                key={row.key}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope='row'
                                                    style={{
                                                        display: 'flex',
                                                        gap: 15,
                                                    }}
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height='50'
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div
                                                        style={{ display: "flex", flexDirection: "column" }}
                                                    >
                                                        <span
                                                            style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{ color: "darkgrey" }}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                    align='right'
                                                    style={{
                                                        color: profit > 0 ? "rgb(14,203,129)" : "red",
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}
                                                    M
                                                </TableCell>
                                            </CustomTableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <CustomPagination
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </CustomBox >
    )
}

export default CoinTable
