import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import styles from './Review.module.css';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { connect } from 'react-redux';
import { requirePropFactory } from "@mui/material";


const StyledAvatar = styled(Avatar)({
  width: "70px",
  height: "70px",
  marginLeft: "10px",
  boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
  "&:hover": {
    cursor: "pointer"
  }
})

const Review = ({ user, review, like, totalLike, toggleLike, goToProfile, goToReview }) => {
  const [date, setDate] = useState();
  
  useEffect(() => {
    const time = new Date(review.createdTime)
    setDate(moment(time).format('YYYY.MM.DD'))
  }, []);

  return (
    <div>
      <div className={styles.review_box}>
        {
          review.userProfileUrl ?
          <StyledAvatar alt="profile" src={review.userProfileUrl} onClick={goToProfile}/> :
          <StyledAvatar alt="profile" src={require("../../assets/default_profile.png")} onClick={goToProfile}/>
        }
        <div className={styles.review_data}>
          <h6 onClick={goToProfile}>{review.userNickName}</h6>
          <div>
            <StarIcon sx={{ color: "#FBE731", marginRight: "5px" }}/>
            <p>{review.score}</p>
          </div>
          <p style={{ color: "gray" }}>{date}</p>
        </div>
        <div className={styles.content_box}>
          <div onClick={goToReview} style={{ width: "100%", cursor: "pointer" }}>
            <p style={{ whiteSpace: "pre-line"}}>{review.content}</p>
          </div>
          <div className={styles.like_box}>
            { 
              like ?
              <FavoriteIcon className={styles.like_icon} onClick={toggleLike}/> :
              <FavoriteBorderIcon className={styles.like_icon} onClick={toggleLike}/>
            }
            <p>{totalLike}</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Review);