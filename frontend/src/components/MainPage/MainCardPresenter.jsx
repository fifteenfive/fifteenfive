import { Grid, Typography,Box, Rating, ButtonBase  } from '@mui/material';
import {styled} from '@mui/material/styles';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Img = styled('img')({
    margin: 'auto',
    padding: '5px',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '20px',
    cursor: 'pointer',
});

const MainCardPresenter = ({wine}) => {
    const navigate = useNavigate();
    const wineId = wine.wineId;
    
    const wineClick = (e) => {
        if (wine.korName !== "와인 임시") {
            navigate(`/wines/${wineId}`);
        } else {
            // e.stopPropagation();
            navigate('/')
        };
    }

    return(
        <Box onClick = {wineClick}
            sx={{ height: 320, maxWidth: 220, p: 2,
            borderRadius: 2, mt : '4%', mb:'4%', ml: '3%',
            backgroundColor: '#ffffff'}}>
            
            <Grid container spacing={2} 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: '1%'
            }}>
                <Grid item sx = {{height: 220}}>
                <Img src = {wine.wineImage}></Img>
                </Grid>
            </Grid>
                <Grid container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }} >
                        <Typography textAlign="center" component='h6' variant='h6' noWrap
                            sx={{fontSize: '0.9rem', marginTop: '15px', width:'100%', color: "#222" }} >
                                {wine.korName}
                        </Typography >
                        <Typography textAlign="center" component='h6' variant='h6' noWrap
                             sx={{fontSize: '0.1rem', color: 'gray'}}>
                            {wine.engName}
                        </Typography>
                    </Grid>
                    <Grid container sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: '5%'
                    }}>
                        <Rating
                        name="rating"
                        precision={0.5} 
                        value={wine.score}
                        readOnly
                        />
                </Grid>
        </Box>
    );
}
export default MainCardPresenter;