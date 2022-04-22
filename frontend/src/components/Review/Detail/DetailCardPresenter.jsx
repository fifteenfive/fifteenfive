import React, { useState, useEffect } from "react";
import styles from'./DetailCard.module.css';
import WineElement from "./DetailElementPresenter";
import moment from 'moment';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, Typography, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledCard = styled(Card)({
  display: "flex",
  marginBottom: "10px",
  marginTop: "60px",
  maxWidth: "60rem",
  minHeight: "330px",
  boxShadow: "2px 2px 10px rgb(194, 192, 192)",
  borderRadius: "5px",
  position: "relative",
  color: "#222",
});


const DetailCard = ({ user, wineName, review, like, totalLike, toggleLike, deleteReview, goToModify }) => {
  const [date, setDate] = useState();
  
  useEffect(() => {
    const time = new Date(review.createdTime);
    setDate(moment(time).format('YYYY.MM.DD'));
  }, []);

  return (
    <div style={{ marginBottom: "30px", maxWidth: "1050px" }}>
      <StyledCard>
        <div style={{ width: "360px", height: "350px" }}>
          { 
            review.reviewImgUrl ?
            <img src={review.reviewImgUrl} alt="" className={styles.image} />:
            <img src={require("../../../assets/default_review.jpg")} alt="" className={styles.image} />
          }
        </div>
        <CardContent sx={{ width: 700, padding: "20px 30px", backgroundColor: "#f5f6f8" }}>
          <div className={styles.header}>
            <Typography variant="h6" component="h6" className={styles.wine_name}>
              {wineName.korName}
            </Typography>
            <div className={styles.ratings}>
              <Rating 
                name="read-only" 
                value={review.score} 
                precision={0.5} 
                sx = {{color: "#FBE731", fontSize: "28px"}}
                readOnly 
              />
              <div className={styles.like_box}>
                { 
                  like ?
                  <FavoriteIcon className={styles.icon} onClick={toggleLike}/> :
                  <FavoriteBorderIcon className={styles.icon} onClick={toggleLike}/>
                }
                <p>{totalLike}</p>
              </div>
            </div>
          </div>
          <div className={styles.wine_element_box}>
            <div className={styles.row}>
              <WineElement type={"당도"} value={review.reviewSweet}></WineElement>
              <WineElement type={"바디"} value={review.reviewBody}></WineElement>
            </div>
            <div className={styles.row}>
              <WineElement type={"산미"} value={review.reviewAcidity}></WineElement>
              <WineElement type={"타닌"} value={review.reviewTannin}></WineElement>
            </div>
          </div>
          <div className={styles.content_box}>
            <div style={{ whiteSpace: "pre-line"}}>
              {review.content}
            </div>
            <Typography variant="body2">
            </Typography>
            <p className={styles.time}>{date}</p>
          </div>
        </CardContent>
      </StyledCard>
      {
        review.userId === user.userId &&
        <div className={styles.buttons}>
          <button onClick={deleteReview}>삭제</button>
          <button onClick={goToModify}>수정</button>
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DetailCard);