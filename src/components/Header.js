import { AppBar, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import styled from '@emotion/styled';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';

const CustomTypography = styled(Typography)`
    font-family: 'Madimi One', sans-serif;
    color: #91C0FF;
    font-weight:600;
    font-size: 1.5rem;
    cursor:pointer;
`;

const CustomAppbar = styled(AppBar)`
    background-color: #2D3748;
`;

const CustomToolbar = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
}
`;
const CustomSelect = styled(Select)`
    color: white
}
`;

const Header = () => {
    const navigate = useNavigate()
    const { currency, setCurrency } = CryptoState()
    return <>
        <CustomAppbar color='transparent' position='static'>
            <CustomToolbar>
                <CustomTypography
                    onClick={() => navigate(`/`)}
                    variant="h6"
                >
                    CryptoFusion
                </CustomTypography>
                <CustomSelect
                    variant='outlined'
                    labelId='demo-label'
                    id='select'
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{ width: 100, height: 40 }}
                >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                </CustomSelect>
            </CustomToolbar>
        </CustomAppbar>
    </>
}

export default Header
