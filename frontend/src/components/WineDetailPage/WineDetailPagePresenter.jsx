import React from "react";
import styles from './WineDetailPage.module.css';
import WineElement from './WineElementPresenter';
import Review from './ReviewContainer'
import { styled } from '@mui/material/styles';
import { Pagination, Stack, Button, Box, Rating, Chip } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { connect } from 'react-redux';

const StyledButton = styled(Button)({
  backgroundColor: "black",
  "&:hover": {
    backgroundColor: "#3a3939"
  }
});

const StyledChip = styled(Chip)({
  backgroundColor: "#afadad", 
  color: "white", 
  margin: "0.7rem 5px 0 0", 
});

const StyledPagination = styled(Pagination)({
  display: "flex",
  justifyContent: "center",
  ul: {
    "& .MuiPaginationItem-root": {
      "&:hover": {
        backgroundColor: "white",
      },
    },
    "& .Mui-selected": {
      backgroundColor: "white",
      color: "#BF2965",
      fontWeight: "bolder",
    },
    li: {
      button: {
        width: "6em",
        textAlign: "center",
        fontSize: "16px"
      }
    }
  },
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


// 와인 상세 페이지
const WineDetailPage = ({ user, wine, reviews, wishList, totalPages, writeReview, changeWishList, changePage }) => {
  return (
    <div className={styles.container}>
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div className={styles.img_box}>
          <img src={wine.wineImage} alt={wine.korName}/>
        </div>
        <div className={styles.wine_detail}>
          <StyledChip 
            style={{ 
              backgroundColor: wineType[wine.wineType] ? wineType[wine.wineType].color : "" 
            }} 
            label={wine.wineType}
          />
          <StyledChip label={wine.wineCountry}/>
          {
            user.userId && wishList &&
            <BookmarkIcon onClick={changeWishList} className={styles.bookmark} sx={{ fontSize: "2.5rem" }} />
          }
          {
            user.userId && !wishList &&
            <BookmarkBorderIcon onClick={changeWishList} className={styles.bookmark} sx={{ fontSize: "2.5rem" }} />
          }
          {/* {
            wishList ?
              <BookmarkIcon onClick={changeWishList} className={styles.bookmark} sx={{ fontSize: "2.5rem" }} /> :
              <BookmarkBorderIcon onClick={changeWishList} className={styles.bookmark} sx={{ fontSize: "2.5rem" }} />
          } */}
          <h4>{wine.korName}</h4>
          <p>{wine.engName}</p>
          <div className={styles.ratings}>
            {/* <p>사용자 평균 평점</p> */}
            {
              wine.score ?
              <div className={styles.rates}>
                <p style={{ fontWeight: "500" }}>{wine.score}</p>
                <Rating 
                  name="read-only" 
                  value={wine.score}
                  precision={0.5} 
                  sx = {{ color: "#FBE731", fontSize: "25px" }}
                  readOnly 
                />
              </div> :
              <div className={styles.rates}>
                <p>-</p>
                <Rating 
                  name="read-only" 
                  value={0}
                  precision={0.5} 
                  sx = {{ color: "#FBE731", fontSize: "25px" }}
                  readOnly 
                />
              </div>
            }
          </div>
          <p>{wine.winePrice}원 ({wine.wineVintage})</p>
          {/* 와인 특성 */}
          <div className={styles.wine_element_box}>
            <div className={styles.row}>
              <WineElement type={"당도"} value={wine.wineSweet}></WineElement>
              <WineElement type={"바디"} value={wine.wineBody}></WineElement>
            </div>
            <div className={styles.row}>
              <WineElement type={"산미"} value={wine.wineAcidity}></WineElement>
              <WineElement type={"타닌"} value={wine.wineTannin}></WineElement>
            </div>
          </div>
          <h5>아로마</h5>
          { 
            wine.aromaList.length === 0 ?
            <div style={{ marginTop: "10px"}}>없음</div> :
            wine.aromaList.map((aroma) => (
              <Chip 
                key={aroma.aromaId} 
                label={aroma.aromaName} 
                sx={{ backgroundColor: "rgb(233 169 149)", color: "white", margin: " 5px 5px 0 0", boxShadow: "1px 1px 2px lightgray"}}
              />
            )) 
          }
        </div>
      </Box>
      {/* 리뷰목록 */}
      <div className={styles.list_box}>
        <div className={styles.header}>
          <h2 style={{ fontSize: "1.5rem" }}>전체 리뷰목록</h2>
            {
              user.userId &&
              <StyledButton 
                variant="contained" 
                onClick={writeReview}
              >
                리뷰 남기기
              </StyledButton>
            }

        </div>
        <div className={styles.reviews}>
          <hr />
          {
            reviews !== undefined ?
            reviews.map((review) => (
              <Review key={review.reviewId} review={review}/>      
            )) :
            <div style={{ textAlign: "center" }}>리뷰가 등록되지 않았습니다</div>
          }
        </div>
        <div className={styles.pagination_box}>
          {
            totalPages !== 0 &&
            <Stack spacing={2}>
              <StyledPagination 
                count={totalPages} 
                size="small"
                shape="rounded"
                onChange={changePage}
              />
            </Stack>

          }
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(WineDetailPage);