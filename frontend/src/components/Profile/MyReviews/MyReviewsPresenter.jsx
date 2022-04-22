import React from "react";
import styles from "./MyReviews.module.css";
import ReviewCard from "./ReviewCardPresenter";

const MyReviews = ({ reviews }) => {
  return (
    <div className={styles.container}>
      { reviews.map(review => (
        <ReviewCard review={review} key={review.reviewId}></ReviewCard>
      ))}
    </div>
  )
};

export default MyReviews;