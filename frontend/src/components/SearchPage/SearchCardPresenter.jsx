import { useState, useEffect } from 'react';
import WineElement from "./DetailElementContainer";
import styles from './SearchCard.module.css';
import { Grid, Paper, Chip, Box } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";

const StyledChip = styled(Chip)({
  backgroundColor: "gray", 
  color: "white", 
  margin: "1.3rem 5px 1.3rem 0", 
});

const wineType = {
  "레드" : {
    color: "#BE3B3A"
  },
  "화이트" : {
    color: "rgb(246 213 107)"
  },
  "스파클링": {
    color: "rgb(218 235 155)"
  },
  "로제": {
    color: "#eec0bb"
  }, 
  "포트": {
    color: "rgb(91 53 48)"
  }
};

const SearchCardPresenter = ({ wineList, user }) => {
    const Img = styled('img')({
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    });
    
    const navigate = useNavigate();
    const [wishList, setWishList] = useState(false);
    
    useEffect(() => {
      getWishList();
    }, []);
  
    const getWishList = () => {
      axios.get(`/api/wishlist/${user.userId}/${wineList.wineId}`)
      .then((res) => {
        res.data === 200 ? setWishList(true) : setWishList(false);
      })
      .catch(err => console.log(err));
    }

    const addWishList = () => {
      const data = {
        userId: user.userId,
        wineId: Number(wineList.wineId)
      }
      axios.post('/api/wishlist/', data)
        .then(() => {
          setWishList(true);
        })
        .catch(err => console.log(err));
    };
  
    const deleteWishList = () => {
      const data = {
        userId: user.userId,
        wineId: wineList.wineId
      }
      axios.delete('/api/wishlist/', { data : data })
        .then(() => {
          setWishList(false);
        })
        .catch(err => console.log(err));
    };
  
    // 아이콘 클릭시 위시리스트 변화
    const toggleWishList = () => {
      wishList ? deleteWishList() : addWishList();
    };

    const priceFormat = () => {
      const price = wineList.winePrice;
      const priceFormat = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); 
      return priceFormat;
    };
    
    const goToWineDetail = () => {
      navigate(`/wines/${wineList.wineId}`);
    };

    return (
      <Grid item >
        <Paper
          className={styles.paper}
          sx={{
            p: 2,
            color: "#222",
            margin: "auto",
            mt: "3rem",
            width: 800,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            boxShadow: "0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Grid container spacing={2} onClick={goToWineDetail}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2} style={{ padding: "1.4rem 0 1.8rem 2.7rem" }}>
                <Grid item>
                  <h4 className={styles.overflow}>{wineList.korName}</h4>
                  <p style={{ color: "#929292" }}>{wineList.engName}</p>
                  <StyledChip 
                    style={{ 
                      backgroundColor: wineType[wineList.wineType] ? wineType[wineList.wineType].color : "" 
                    }} 
                    label={wineList.wineType}
                  />
                  <StyledChip label={wineList.wineCountry}/>
                  <p style={{ color: "#222" }}>{priceFormat()}원 ({wineList.wineVintage})</p>
                </Grid>
                <Grid container sx={{ ml: "16px", mt: '1.3rem', width: "80%" }}>
                  <Grid item xs = {6}>
                    <WineElement type={"당도"} value={wineList.wineSweet}></WineElement>
                    <WineElement type={"바디"} value={wineList.wineBody}></WineElement>
                  </Grid>
                  <Grid item xs = {6}>
                    <WineElement type={"산미"} value={wineList.wineAcidity}></WineElement>
                    <WineElement type={"타닌"} value={wineList.wineTannin}></WineElement>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              sx = {{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
                padding: "20px 0"
              }}
            >
              <Grid item sx = {{ width: 200, height: 270, mt: '16%', mr: "80%" }}>
                <Img src={wineList.wineImage}></Img>
              </Grid>
            </Grid>
          </Grid>
          <Grid onClick={toggleWishList} className={styles.wishlist}>
            {
              wishList ? 
              <BookmarkIcon sx={{ width: "2.3rem", height: "2.3rem" }}/> :
              <BookmarkBorderOutlinedIcon sx={{ width: "2.3rem", height: "2.3rem" }}/>
            }
          </Grid>
        </Paper>
      </Grid>
    );
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }

  export default connect(mapStateToProps)(SearchCardPresenter);