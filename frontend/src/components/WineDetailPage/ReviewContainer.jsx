import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Review from "./ReviewPresenter";

const ReviewContainer = ({ review }) => {
  const navigate = useNavigate();
  const { wineId } = useParams();
  const [like, setLike] = useState(false);
  const [totalLike, setTotalLike] = useState(0);

  const token = localStorage.getItem('token');
  const config = { 
    headers : {
      Authorization: `Bearer ${token}`
    }
  };

  // 각 리뷰의 좋아요수, 좋아요 여부 불러오기
  useEffect(() => {
    getLike();
  }, [])

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
    axios.post(`/api/reviews/${review.reviewId}/likes`, '', config)
    .then((res) => {
      setTotalLike(totalLike+1);
      setLike(true);
      console.log(res)
    })
    .catch(err => console.log(err));
  };

  const likeDelete = () => {
    axios.delete(`/api/reviews/${review.reviewId}/no_likes`, config)
    .then((res) => {
      setTotalLike(totalLike-1);
      setLike(false);
      console.log(res)
    })
    .catch(err => console.log(err));
  };

  const goToProfile = () => {
    navigate(`/profile/${review.userId}`);
  };

  const goToReview = () => {
    const author = { nickName: review.userNickName, userId: review.userId, profileUrl: review.userProfileUrl };
    
    navigate(`/wines/${wineId}/reviews/user/${review.userId}`, { 
      state: {
        author: author
      }
    });
  };

  return (
    <Review 
      review={review} 
      like={like} 
      totalLike={totalLike} 
      toggleLike={toggleLike} 
      goToProfile={goToProfile}
      goToReview={goToReview}
    />
  )
};

export default ReviewContainer;