import { Container, Box } from '@mui/material'
import React from 'react'
import styled from '@emotion/styled';
import bannerURL from './banner.jpg'
import Carousal from './Carousal';

const CustomBox = styled(Box)`
    background-image: url(${bannerURL})
    // background-color: #2D3250
`;
const CustomContainer = styled(Container)`
    height: 400px;
    display: flex;
    flex-direction: column;
    padding-bottom : 25px;
    justify-content: space-around;
`;

// const CustomBox2 = styled(Box)`
//     display: flex;
//     height: 40%;
//     flex-direction: column;
//     justify-content: center;
//     text-align: center;
// `;

const Banner = () => {
    return (
        <CustomBox>
            <CustomContainer>
                {/* <CustomBox2>
                    <Typography variant="h2"
                        style={{
                            fontWeight: "bold",
                            color: 'white',
                            marginBottom: 15,
                            fontFamily: "Madimi One",
                        }}>
                        CryptoFusion
                    </Typography>
                    <Typography variant="subtitle"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Madimi One",
                        }}>
                        Get the insights about your desired crypto currency
                    </Typography>
                </CustomBox2> */}
                <Carousal />
            </CustomContainer>

        </CustomBox>
    )
}

export default Banner
