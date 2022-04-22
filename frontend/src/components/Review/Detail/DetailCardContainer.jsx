import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DetailCard from "./DetailCardPresenter";
import Swal from 'sweetalert2';

const DetailCardContainer = ({ review, wineName }) => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { wineId } = useParams();
  
  const [like, setLike] = useState(false);
  const [totalLike, setTotalLike] = useState(0);
  const token = localStorage.getItem('token');
  const config = { 
    headers : {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    getLike();
  }, []);

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
    .then(() => {
      setTotalLike(totalLike+1);
      setLike(true);
    })
    .catch(err => console.log(err));
  };

  const likeDelete = () => {
    const token = localStorage.getItem('token')
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

  const goToModify = () => {
    navigate(`/review/${review.reviewId}`, {
      state: { review: review, wineId: wineId, wineName: wineName }
    });
  }

  const deleteReview = () => {
    Swal.fire({
      title: '정말로 삭제하시겠습니까?',
      text: "리뷰 삭제시 되돌릴 수 없습니다",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '예',
      cancelButtonText:'아니오',
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `/api/wines/{wineId}/reviews/${review.reviewId}`
        axios.delete(url)
        .then(() => {
          navigate(`/wines/${wineId}`)
        })
        .catch(err => {
          console.log(err.response)
        })
      }
    })
  }

  return (
    <DetailCard 
      wineName={wineName}
      review={review} 
      like={like} 
      totalLike={totalLike} 
      toggleLike={toggleLike}
      goToModify={goToModify}
      deleteReview={deleteReview}
    />
  );
};

export default DetailCardContainer;