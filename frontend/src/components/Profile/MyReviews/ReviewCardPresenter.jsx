import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from'./ReviewCard.module.css';
import { styled } from '@mui/material/styles';
import {Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WineElement from "./DetailElementPresenter";
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';


const StyledCard = styled(Card)({
  display: "flex",
  marginBottom: "70px",
  maxWidth: "58rem",
  minHeight: "350px",
  boxShadow: "2px 2px 10px rgb(194, 192, 192)",
  borderRadius: "5px",
  color: "#222",
});


const ReviewCard = ({ review, user }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [like, setLike] = useState(false);
  const [totalLike, setTotalLike] = useState(0);
  const [date, setDate] = useState('');
  
  const token = localStorage.getItem('token');
  const config = { 
    headers : {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    getLike();
    const time = new Date(review.createdTime);
    setDate(moment(time).format('YYYY.MM.DD'));
  }, []);

  const goToWineDetail = () => {
    navigate(`/wines/${review.wine.wineId}`);
  };

  const getLike = () => {
    const url = `/api/reviews/${review.reviewId}/likes`
    axios.get(url, config)
      .then((res) => {
        if (res.data.isLiked === 1) {
          setLike(true);
        } else {
          setLike(false);
        };
        setTotalLike(res.data.totalLike);

      })
      .catch(err => console.log(err));
  };

  const toggleLike = () => {
    like ? likeDelete() : likeAdd();
  };

  const likeAdd = () => {
    const data = '12'
    axios.post(`/api/reviews/${review.reviewId}/likes`, data, config)
    .then(() => {
      setTotalLike(totalLike+1);
      setLike(true);
    })
    .catch(err => console.log(err));
  };

  const likeDelete = () => {
    const token = localStorage.getItem('token');
    axios.delete(`/api/reviews/${review.reviewId}/no_likes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      setTotalLike(totalLike-1);
      setLike(false);
    })
    .catch(err => console.log(err));
  };

  return (
    <StyledCard>
      <div style={{ width: "370px", height: "350px"}}>
        { 
          review.reviewImgUrl ?
          <img src={review.reviewImgUrl} alt="review_image" className={styles.image} />:
          <img src={require("../../../assets/default_review.jpg")} alt="review_image" className={styles.image} />
        }
      </div>
      <CardContent sx={{ width: 600, padding: "20px 40px", backgroundColor: "#f5f6f8" }}>
        <div className={styles.header}>
          <Typography variant="h6" component="div" className={styles.wine_name} onClick={goToWineDetail}>
            {review.wine.korName}
          </Typography>
          <div className={styles.ratings}>
            <Rating 
              name="read-only" 
              value={review.score} 
              precision={0.5} 
              sx = {{color: "#FBE731"}}
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
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ReviewCard);