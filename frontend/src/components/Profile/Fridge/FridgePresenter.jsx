import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Fridge.module.css";
import { styled } from '@mui/material/styles';
import { Grid, Box, Container } from '@mui/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const WineCard = ({ wine }) => {
  const navigate = useNavigate();

  const goToWineDetail = () => {
    navigate(`/wines/${wine.wineId}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
      <Box 
        sx={{ height: 220, maxWidth: 190, p: 2, borderRadius: 2 }}
        className={styles.wine_card}
        onClick={goToWineDetail}
        >
        <div className={styles.wine_box}>
          <Grid item sx={{ height: 150, margin: "12px 0" }}>
            <Img src={wine.wineImage} className={styles.image}/>
          </Grid>
          <Grid item xs={12} fontSize="">
            <h5>{wine.korName}</h5>
            <p>{wine.engName}</p>
          </Grid>
        </div>
      </Box>
    </Grid>
  )
}

const Fridge = ({ wines }) => {

  return (
    <div className={styles.container}>
      <Container>
        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Grid container spacing={2}>
            { wines.map(wine => (
              <WineCard wine={wine} key={wine.wineId}/>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  )
};

export default Fridge;