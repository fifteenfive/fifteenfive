import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyReviews from "./MyReviewsPresenter";
import axios from "axios";

const MyReviewsContainer = () => {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMyReivews();
  }, []);

  const getMyReivews = () => {
    axios.get(`/api/mypage/${userId}/reviews`)
    .then(res => {
      setReviews(res.data.result);
    })
    .catch(err => console.log(err));
  };

  return (
    <MyReviews reviews={reviews}></MyReviews>
  )
};

export default MyReviewsContainer;