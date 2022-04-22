import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReviewDetail from "./ReviewDetailPresenter";
import axios from "axios";

const ReviewDetailContainer = () => {
  const { wineId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [wineName, setWineName] = useState({});
  const [reviews, setReviews] = useState([]);
  const [author, setAuthor] = useState({}); 

  useEffect(() => {
    setAuthor(location.state.author);
    window.scrollTo(0, 0);

    // 리뷰 상세 GET
    axios.get(`/api/wines/${wineId}/reviews/{reiew_id}?user_id=${location.state.author.userId}`)
      .then((res) => {
        const data = res.data;
        setWineName({
          korName: data.wine_name_kor,
          engName: data.wine_name_eng
        })
        setReviews(data.reviews);
      })
      .catch(err => console.log(err));
  }, [])

  const goToProfile = () => {
    navigate(`/profile/${author.userId}`);
  };

  const goToWineDetail = () => {
    navigate(`/wines/${wineId}`);
  };

  return (
    <ReviewDetail 
      reviews={reviews} 
      wineName={wineName}
      author={author}
      goToProfile={goToProfile}
      goToWineDetail={goToWineDetail}
    />
  );
};

export default ReviewDetailContainer;