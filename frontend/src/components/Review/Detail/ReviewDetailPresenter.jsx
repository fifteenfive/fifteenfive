import React, { useEffect, useState } from "react";
import styles from'./ReviewDetail.module.css';
import { styled } from '@mui/material/styles';
import DetailCard from './DetailCardContainer'
import { Avatar } from '@mui/material';

const StyledAvatar = styled(Avatar)({
  width: "75px",
  height: "75px",
  marginRight: "25px",
  boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
  "&:hover": {
    cursor: "pointer"
  }
})

const ReviewDetail = ({ reviews, wineName, author, goToProfile, goToWineDetail }) => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <div className={styles.wine_name}>
            <h3 onClick={goToWineDetail}>{wineName.korName}</h3>
            <p>{wineName.engName}</p>
          </div>
          <div className={styles.like_box}>
          </div>
        </div>
        <div className={styles.userinfo}>
          {
            author.profileUrl ?
            <StyledAvatar src={author.profileUrl} alt="profile_image" onClick={goToProfile}/> :
            <StyledAvatar src={require("../../../assets/default_profile.png")} alt="profile_image" onClick={goToProfile}/>
          }
          <span onClick={goToProfile}>{author.nickName}님</span>
        </div>
        <div className={styles.reviews}>
          { reviews.map(review => (
            <DetailCard review={review} wineName={wineName} key={review.reviewId}></DetailCard>
          )) }
        </div>

      </div>
    </div>
  ); 
};

export default ReviewDetail;
