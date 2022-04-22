import { useState } from 'react';
import WineElement from "./DetailElementContainer";
import styles from './ListWineCard.module.css';
import { Grid, Paper, Chip} from '@mui/material';
import { styled } from '@mui/material/styles';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';
import { connect } from "react-redux";

const StyledChip = styled(Chip)({
  backgroundColor: "gray", 
  color: "white", 
  margin: "0.7rem 5px 1rem 0", 
});

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
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

const ListWineCardPresenter = ({ user, wineList, cntWishList }) => {
    const [wishList, setWishList] = useState(false);
    
    const addWishList = () => {
      const data = {
        userId: user.userId,
        wineId: Number(wineList.wineId)
      }
      axios.post('/api/wishlist/', data)
        .then(() => {
          setWishList(true);
          cntWishList("add");
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
          cntWishList("delete");
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
  
    return (
      <Grid item >
        <Paper
          onClick={toggleWishList}
          sx={{
            p: 2,
            margin: 'auto',
            color: "#222",
            mt: "3.2rem",
            width: 750,
            height: 320,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            boxShadow: wishList ? "3px 3px 12px 4px lightgray" : "0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);",
            border: wishList ? "4px solid #cd5c5c" : "",
            cursor: "pointer",
            position: "relative",
          }}
          className={styles.paper}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2} style={{ padding: "1rem 0 1rem 3rem"}}>
                <Grid item className={styles.header}>
                  <h4>{wineList.korName}</h4>
                  <p className={styles.engname}>{wineList.engName}</p>
                  <StyledChip 
                    label={wineList.wineType}
                    style={{ 
                      backgroundColor: wineType[wineList.wineType] ? wineType[wineList.wineType].color : "" 
                    }}
                    />
                  <StyledChip label={wineList.wineCountry}/>
                  <p className={styles.price}>{priceFormat()}원 ({wineList.wineVintage})</p>
                </Grid>
                <Grid container sx={{ ml: "16px", mt: '2rem', width: "80%" }}>
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
              <Grid item sx={{ width: 200, height: 250, mt: '10%', mr: "75%" }}>
                <Img src={wineList.wineImage}></Img>
              </Grid>
            </Grid>
            <Grid sx={{ position: "absolute", right: "1.8rem", top: "1rem", color: "gray" }}>
              {
                wishList ? 
                <BookmarkIcon sx={{ width: "2.3rem", height: "2.3rem", cursor: "pointer"}}/> :
                <BookmarkBorderOutlinedIcon sx={{ width: "2.3rem", height: "2.3rem", cursor: "pointer"}}/>
              }
            </Grid>
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
  
  export default connect(mapStateToProps)(ListWineCardPresenter);