import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WishList.module.css";
import { styled } from '@mui/material/styles';
import { Grid, Box, Rating, Container } from '@mui/material';

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

  return(
     <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: "flex", justifyContent: "center", mb: "3rem" }}>
      <Box 
        boxShadow='3' 
        sx={{ height: 220, p: 2, borderRadius: 2, backgroundColor: "white" }}
        onClick={() => goToWineDetail()}
        >
        <div className={styles.wine_box}>
          <Grid item sx={{ height: 140 }}>
            <Img src={wine.wineImage}/>
          </Grid>
          <Grid item xs={12} fontSize="">
            <h5>{wine.korName}</h5>
            <p>{wine.engName}</p>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Rating
              name="read-only" 
              value={wine.score} 
              precision={0.5} 
              sx = {{ color: "#FBE731", marginTop: "5px" }}
              readOnly 
            />
          </Grid>
        </div>
      </Box>
    </Grid>
  )

}

const WishList = ({ wines }) => {

  return (
    <div className={styles.container}>
      <Container>
        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Grid container>
            { wines.map(wine => (
              <WineCard wine={wine} key={wine.wineId}/>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  )
};

export default WishList;